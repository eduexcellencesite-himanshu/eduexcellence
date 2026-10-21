
const mongoose = require("mongoose");
const PartnershipInquiry = require("../models/PartnershipInquiry");

const VALID_STATUSES = [
  "new",
  "contacted",
  "in_progress",
  "resolved",
];

const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const INTERESTS = [
  "Speaking Opportunities",
  "Expo & Exhibition",
  "Partnership & Sponsorship",
  "Recognition",
];

// POST /api/partnership-inquiries
exports.createInquiry = async (req, res) => {
  try {
    const { name, email, phone, organisation, message, interest, pageUrl } =
      req.body;

    if (
      !name?.trim() ||
      !email?.trim() ||
      !organisation?.trim() ||
      !message?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, email, organisation and message are required.",
      });
    }

    if (!INTERESTS.includes(interest)) {
      return res.status(400).json({
        success: false,
        message: "Please select your area of interest.",
      });
    }

    if (
      name.trim().length > 100 ||
      email.trim().length > 254 ||
      organisation.trim().length > 150 ||
      message.trim().length > 3000 ||
      (phone && String(phone).length > 20)
    ) {
      return res.status(400).json({
        success: false,
        message: "One or more fields exceed the allowed length.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    const inquiry = await PartnershipInquiry.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: typeof phone === "string" ? phone.replace(/\s+/g, "").slice(0, 20) : "",
      interest,
      organisation: organisation.trim(),
      message: message.trim(),
      pageUrl: typeof pageUrl === "string"
        ? pageUrl.slice(0, 2000)
        : "",
    });

    return res.status(201).json({
      success: true,
      message: "Your interest has been submitted successfully.",
      data: { id: inquiry._id },
    });
  } catch (error) {
    console.error("Create partnership inquiry:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to submit your inquiry.",
    });
  }
};

// GET /api/admin/partnership-inquiries?page=1&limit=10&search=
exports.getInquiries = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(req.query.limit, 10) || 10)
    );
    const skip = (page - 1) * limit;

    const search =
      typeof req.query.search === "string"
        ? req.query.search.trim().slice(0, 100)
        : "";

    const status = req.query.status;
    const filter = {};

    if (search) {
      const regex = new RegExp(escapeRegex(search), "i");
      filter.$or = [
        { name: regex },
        { email: regex },
        { organisation: regex },
        { interest: regex },
        { message: regex },
      ];
    }

    if (status && status !== "all") {
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status filter.",
        });
      }
      filter.status = status;
    }

    const [inquiries, total] = await Promise.all([
      PartnershipInquiry.find(filter)
        .select("-__v")
        .sort({ createdAt: -1, _id: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      PartnershipInquiry.countDocuments(filter),
    ]);

    return res.json({
      success: true,
      data: inquiries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: skip + inquiries.length < total,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Get partnership inquiries:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch inquiries.",
    });
  }
};

// GET /api/admin/partnership-inquiries/:id
exports.getInquiryById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid inquiry ID.",
      });
    }

    const inquiry = await PartnershipInquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found.",
      });
    }

    return res.json({ success: true, data: inquiry });
  } catch (error) {
    console.error("Get inquiry:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch inquiry.",
    });
  }
};

// PATCH /api/admin/partnership-inquiries/:id/status
exports.updateInquiry = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid inquiry ID.",
      });
    }

    const { status, adminNotes } = req.body;
    const updates = {};

    if (status !== undefined) {
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status.",
        });
      }
      updates.status = status;
    }

    if (adminNotes !== undefined) {
      if (
        typeof adminNotes !== "string" ||
        adminNotes.length > 2000
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid admin notes.",
        });
      }
      updates.adminNotes = adminNotes;
    }

    if (!Object.keys(updates).length) {
      return res.status(400).json({
        success: false,
        message: "Provide a status or adminNotes field.",
      });
    }

    const inquiry = await PartnershipInquiry.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found.",
      });
    }

    return res.json({
      success: true,
      message: "Inquiry updated successfully.",
      data: inquiry,
    });
  } catch (error) {
    console.error("Update inquiry:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to update inquiry.",
    });
  }
};

// DELETE /api/admin/partnership-inquiries/:id
exports.deleteInquiry = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid inquiry ID.",
      });
    }

    const inquiry = await PartnershipInquiry.findByIdAndDelete(
      req.params.id
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found.",
      });
    }

    return res.json({
      success: true,
      message: "Inquiry deleted successfully.",
    });
  } catch (error) {
    console.error("Delete inquiry:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete inquiry.",
    });
  }
};

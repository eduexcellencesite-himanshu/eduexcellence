const express = require("express");
const router = express.Router();
const { auth, adminOnly } = require("../middleware/authMiddleware");
const Contact = require("../models/Contact");
const Registration = require("../models/Registration");
const PartnershipInquiry = require("../models/PartnershipInquiry");

// GET /api/admin/stats — live counts for the dashboard cards.
router.get("/admin/stats", auth, adminOnly, async (req, res) => {
  try {
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const [contacts, contactsWeek, registrations, registrationsWeek, inquiries, inquiriesWeek, inquiriesNew] =
      await Promise.all([
        Contact.countDocuments(),
        Contact.countDocuments({ createdAt: { $gte: since } }),
        Registration.countDocuments(),
        Registration.countDocuments({ createdAt: { $gte: since } }),
        PartnershipInquiry.countDocuments(),
        PartnershipInquiry.countDocuments({ createdAt: { $gte: since } }),
        PartnershipInquiry.countDocuments({ status: "new" }),
      ]);
    res.json({
      success: true,
      data: {
        contacts: { total: contacts, week: contactsWeek },
        registrations: { total: registrations, week: registrationsWeek },
        inquiries: { total: inquiries, week: inquiriesWeek, pending: inquiriesNew },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

const Sponsor = require("../models/Sponsor");
const { notify } = require("../utils/mailer");
const tpl = require("../utils/emailTemplates");

exports.createSponsor = async (
  req,
  res
) => {
  try {
    const sponsor =
      await Sponsor.create(req.body);

    await notify({
      userEmail: sponsor.email,
      userTpl: tpl.sponsorUser(sponsor),
      adminTpl: tpl.sponsorAdmin(sponsor),
    });

    res.status(201).json({
      success: true,
      message:
        "Sponsor enquiry submitted successfully.",
      sponsor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSponsors = async (
  req,
  res
) => {
  try {
    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;

    const skip =
      (page - 1) * limit;

    const total =
      await Sponsor.countDocuments();

    const sponsors =
      await Sponsor.find()
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit);

    res.json({
      success: true,
      sponsors,
      total,
      page,
      pages: Math.ceil(
        total / limit
      ),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
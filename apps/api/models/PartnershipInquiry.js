
const mongoose = require("mongoose");

const partnershipInquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 20,
      default: "",
    },
    interest: {
      type: String,
      enum: ["Speaking Opportunities", "Expo & Exhibition", "Partnership & Sponsorship", "Recognition", ""],
      default: "",
      index: true,
    },
    organisation: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000,
    },
    status: {
      type: String,
      enum: ["new", "contacted", "in_progress", "resolved"],
      default: "new",
      index: true,
    },
    source: {
      type: String,
      default: "eduecarnival-2026-partnership",
    },
    pageUrl: {
      type: String,
      default: "",
    },
    adminNotes: {
      type: String,
      default: "",
      maxlength: 2000,
    },
  },
  { timestamps: true }
);

partnershipInquirySchema.index({ createdAt: -1 });
partnershipInquirySchema.index({ email: 1 });

module.exports = mongoose.model(
  "PartnershipInquiry",
  partnershipInquirySchema
);

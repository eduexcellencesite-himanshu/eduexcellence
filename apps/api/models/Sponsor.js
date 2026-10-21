const mongoose = require("mongoose");

const sponsorSchema = new mongoose.Schema(
  {
    salutation: {
      type: String,
      default: "Mr.",
    },

    fullName: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    organisation: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
      required: true,
    },

    productDetails: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Sponsor",
  sponsorSchema
);
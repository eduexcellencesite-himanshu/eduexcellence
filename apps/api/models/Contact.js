const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    salutation: String,
    fullName: String,
    phone: String,
    email: String,
    institution: String,
    designation: String,
    state: String,
    city: String,
    message: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
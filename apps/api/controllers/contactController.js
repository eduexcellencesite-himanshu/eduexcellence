const Contact = require("../models/Contact");
const { notify } = require("../utils/mailer");
const tpl = require("../utils/emailTemplates");

// Create Contact
exports.createContact = async (req, res) => {
try {
// The contact form collects firstName + lastName; the model stores fullName.
const fullName =
  req.body.fullName ||
  [req.body.firstName, req.body.lastName].filter(Boolean).join(" ").trim();
const contact = await Contact.create({ ...req.body, fullName });

await notify({
  userEmail: contact.email,
  userTpl: tpl.contactUser(contact),
  adminTpl: tpl.contactAdmin(contact),
});

res.status(201).json({
  success: true,
  message: "Contact enquiry submitted successfully",
  data: contact,
});


} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

// Get Contacts with Pagination
exports.getContacts = async (req, res) => {
try {
const page = Number(req.query.page) || 1;
const limit = Number(req.query.limit) || 10;

 
const skip = (page - 1) * limit;

const total = await Contact.countDocuments();

const contacts = await Contact.find()
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(limit);

res.status(200).json({
  success: true,
  contacts,
  total,
  page,
  pages: Math.ceil(total / limit),
});
 

} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

// Get Single Contact
exports.getContactById = async (req, res) => {
try {
const contact = await Contact.findById(req.params.id);


if (!contact) {
  return res.status(404).json({
    success: false,
    message: "Contact not found",
  });
}

res.status(200).json({
  success: true,
  data: contact,
});


} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

// Delete Contact
exports.deleteContact = async (req, res) => {
try {
const contact = await Contact.findById(req.params.id);


if (!contact) {
  return res.status(404).json({
    success: false,
    message: "Contact not found",
  });
}

await Contact.findByIdAndDelete(req.params.id);

res.status(200).json({
  success: true,
  message: "Contact deleted successfully",
});


} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

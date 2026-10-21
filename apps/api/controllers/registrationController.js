const Registration = require("../models/Registration");
const { notify } = require("../utils/mailer");
const tpl = require("../utils/emailTemplates");

exports.createRegistration = async (
req,
res
) => {
try {
const registration =
await Registration.create(req.body);

await notify({
  userEmail: registration.email,
  userTpl: tpl.registrationUser(registration),
  adminTpl: tpl.registrationAdmin(registration),
});

res.status(201).json({
  success: true,
  message:
    "Registration submitted successfully",
  data: registration,
});


} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

exports.getRegistrations = async (
req,
res
) => {
try {
const page =
Number(req.query.page) || 1;


const limit =
  Number(req.query.limit) || 10;

const skip = (page - 1) * limit;

const total =
  await Registration.countDocuments();

const registrations =
  await Registration.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

res.status(200).json({
  success: true,
  registrations,
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

exports.deleteRegistration =
async (req, res) => {
try {
await Registration.findByIdAndDelete(
req.params.id
);


  res.status(200).json({
    success: true,
    message:
      "Registration deleted successfully",
  });
} catch (error) {
  res.status(500).json({
    success: false,
    message: error.message,
  });
}


};

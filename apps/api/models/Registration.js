const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
{
program: {
type: String,
required: true,
},


track: String,

salutation: String,

firstName: {
  type: String,
  required: true,
},

lastName: {
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

school: {
  type: String,
  required: true,
},

designation: {
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

interestedCountries: [String],

internationalPrograms: {
  type: Boolean,
  default: false,
},


},
{
timestamps: true,
}
);

module.exports = mongoose.model(
"Registration",
registrationSchema
);

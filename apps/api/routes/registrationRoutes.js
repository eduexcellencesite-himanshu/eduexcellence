const express = require("express");

const router = express.Router();

const {
createRegistration,
getRegistrations,
deleteRegistration,
} = require(
"../controllers/registrationController"
);

const {
auth,
} = require("../middleware/authMiddleware");

const {
adminOnly,
} = require("../middleware/roleMiddleware");

router.post(
"/registration",
createRegistration
);

router.get(
"/admin/registrations",
auth,
adminOnly,
getRegistrations
);

router.delete(
"/admin/registrations/:id",
auth,
adminOnly,
deleteRegistration
);

module.exports = router;

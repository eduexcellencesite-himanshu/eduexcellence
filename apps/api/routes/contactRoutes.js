const express = require("express");

const router = express.Router();

const {
createContact,
getContacts,
getContactById,
deleteContact,
} = require("../controllers/contactController");

const {
auth,
} = require("../middleware/authMiddleware");

const {
adminOnly,
} = require("../middleware/roleMiddleware");

router.post("/contact", createContact);

router.get(
"/admin/contacts",
auth,
adminOnly,
getContacts
);

router.get(
"/admin/contacts/:id",
auth,
adminOnly,
getContactById
);

router.delete(
"/admin/contacts/:id",
auth,
adminOnly,
deleteContact
);

module.exports = router;

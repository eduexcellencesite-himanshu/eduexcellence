
const express = require("express");
const router = express.Router();

const {
  auth,
  adminOnly,
} = require("../middleware/authMiddleware");

const controller = require("../controllers/partnershipInquiryController");

// Public route: submit a partnership inquiry
router.post("/", controller.createInquiry);
console.log("auth:", typeof auth);
console.log("adminOnly:", typeof adminOnly);
console.log(
  "getInquiries:",
  typeof controller.getInquiries
);
console.log(
  "getInquiryById:",
  typeof controller.getInquiryById
);
console.log(
  "updateInquiry:",
  typeof controller.updateInquiry
);
console.log(
  "deleteInquiry:",
  typeof controller.deleteInquiry
);
// Admin routes: authentication + admin role required
router.get("/admin", auth, adminOnly, controller.getInquiries);

router.get(
  "/admin/:id",
  auth,
  adminOnly,
  controller.getInquiryById
);

router.patch(
  "/admin/:id/status",
  auth,
  adminOnly,
  controller.updateInquiry
);

router.delete(
  "/admin/:id",
  auth,
  adminOnly,
  controller.deleteInquiry
);

module.exports = router;


const express = require("express");
const router = express.Router();

const {
  auth,
  adminOnly,
} = require("../middleware/authMiddleware");

const controller = require("../controllers/partnershipInquiryController");
const { requireTurnstile } = require("../utils/turnstile");

// Public route: submit a partnership enquiry
router.post("/", requireTurnstile, controller.createInquiry);
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

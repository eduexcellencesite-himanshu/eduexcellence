const express = require("express");

const router = express.Router();

const {
  createSponsor,
  getSponsors,
} = require("../controllers/sponsorController");

const {
  auth,
} = require("../middleware/authMiddleware");

const {
  adminOnly,
} = require("../middleware/roleMiddleware");

router.post(
  "/sponsor",
  createSponsor
);

router.get(
  "/admin/sponsors",
  auth,
  adminOnly,
  getSponsors
);

module.exports = router;
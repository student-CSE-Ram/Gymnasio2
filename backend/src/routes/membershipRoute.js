const express = require("express");

const { authMiddleware } = require("../middleware/authMiddleware");
const {roleMiddleware} = require("../middleware/roleMiddleware");

const {
  createMembership,
  getMembership,
  cancelMembership,
  reactivateMembership,
} = require("../controllers/membershipController");

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  createMembership
);

router.get(
  "/",
  authMiddleware,
  getMembership
);
router.put(
  "/cancel/:membershipId",
  authMiddleware,
  roleMiddleware("owner"),
  cancelMembership
);
router.put(
  "/reactivate/:membershipId",
  authMiddleware,
  reactivateMembership
);

module.exports = router;
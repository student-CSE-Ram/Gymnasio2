const express = require("express");
const { createMember, createTrainer , deleteUser, getAllMember,getAlltrainer,assignMemberToTrainer,getTrainerMembers} = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { roleMiddleware } = require("../middleware/roleMiddleware");

const router = express.Router();

// Only owner can create members or trainers
router.post("/create-member", authMiddleware, roleMiddleware("owner"), createMember);
router.post("/create-trainer", authMiddleware, roleMiddleware("owner"), createTrainer);
router.delete('/delete-user/:id', authMiddleware, roleMiddleware("owner"), deleteUser);
router.get('/all-members',authMiddleware,roleMiddleware("owner","trainer"),getAllMember);
router.get('/all-trainers',authMiddleware,roleMiddleware('owner'),getAlltrainer);
router.post('/assign-member-trainer',authMiddleware,roleMiddleware('owner'),assignMemberToTrainer);
router.get('/trainer-members',authMiddleware,roleMiddleware('trainer'),getTrainerMembers);

module.exports = router;
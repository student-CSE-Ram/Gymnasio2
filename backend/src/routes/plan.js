const express = require("express");

const {createPlan, getAllPlans,updatePlan,deletePlanByName,deletePlanById} =require('../controllers/planController')
const { authMiddleware } = require("../middleware/authMiddleware");
const { roleMiddleware } = require("../middleware/roleMiddleware");



const router = express.Router();


router.post('/createPlan',authMiddleware,roleMiddleware("owner"),createPlan);
router.get('/getAllPlans',authMiddleware,getAllPlans);
router.put('/updatePlan',authMiddleware,roleMiddleware("owner"),updatePlan);
router.delete('/delete/by-id/:id',authMiddleware,roleMiddleware("owner"),deletePlanById);
router.delete('/delete/by-name/:name',authMiddleware,roleMiddleware("owner"),deletePlanByName);

module.exports = router;

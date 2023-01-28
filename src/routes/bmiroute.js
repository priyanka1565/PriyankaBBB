const express = require("express");
const bmiController = require("../controller/bmiController");

const router = express.Router();

// register 


router.post("/get-bmi",bmiController.bmiCalculator);
router.get("/get-all-bmi",bmiController.getAllBmi);

module.exports = router;


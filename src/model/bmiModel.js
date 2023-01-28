const mongoose = require("mongoose");


// for genrating user reset password 
// make user model 
const bmiSchema = new mongoose.Schema({
  height: {
    type: Number,
    required: [false, "Please Enter valid height "],
  },
  weight: {
    type: Number,
    required: [false, "please enter valid weight"],
  },
});


// export 
module.exports = mongoose.model("BMI", bmiSchema);
const BMI = require("../model/bmiModel");

const bmiCalculator = async(req,res)=>{
    try{
      const weight1 = req.body.weight;
      const height1 = req.body.height;
      const square_height = height1*height1;
    
      let result 
      const bmiValue  = (weight1/square_height).toFixed(2);


      // insert data into db
      const bmi = await  BMI.create({
        weight:weight1,
        height:height1
      })

      if(bmi){
        if(bmiValue<=18.5){
            result = "Under Weight";
           return res.status(200).json({message:"get Bmi vale",data:{result:result,bmiValue:bmiValue}})
         }
         else if(bmiValue>=18.5 && bmiValue<=24.9){
           result = "Normal Weight";
          return res.status(200).json({message:"get Bmi vale",data:{result:result,bmiValue:bmiValue}})
        }
        else if(bmiValue>=25 && bmiValue<=29.9){
           result = "OverWeight";
          return res.status(200).json({message:"get Bmi vale",data:{result:result,bmiValue:bmiValue}})
        }
        else if(bmiValue>=30 && bmiValue<=34.9){
           result = "Obesity";
          return res.status(200).json({message:"get Bmi vale",data:{result:result,bmiValue:bmiValue}})
        }
        else if(bmiValue>=35 && bmiValue<=39.9){
           result = "Extreme Obesity";
          return res.status(200).json({message:"get Bmi vale",data:{result:result,bmiValue:bmiValue}})
        }
        else{
           result = "Incorrect Value";
           return res.status(200).json({message:"get Bmi vale",data:{result:result,bmiValue:bmiValue}})
        }
      }
      else{
        return res.status(200).json({message:"error in insertion",data:{}})
      }
      
    }
    catch(err){
        return res.send({
            message: err.message
        });
    }
}

const getAllBmi = async(req,res)=>{
    try{
        const bmi = await BMI.find().lean().exec();
        
        if(bmi){
            return res.status(200).send(bmi)
        }
        else{
            return res.status(200).send([])
        }
    }
    catch(err){
        return res.send({
            message: err.message
        });
    }
}


module.exports = {
    bmiCalculator,
    getAllBmi
}
const User = require("../model/userModel");
const sendToken = require("../utils/sendToken");

// make user registration function

const userRegistration = async (req, res, next) => {
    try {

        // destructuring of object
        const {
            email,
            password,
            name
        } = req.body;

        const user = await User.create({
            email,
            password,
            name,
        });
        sendToken(user, 201, res);
    } catch (err) {
        return res.send({
            message: err.message
        });
    }
};

/// make logIn user function

const userLogin = async (req, res, next) => {
   try{
    const {
        email,
        password,name
    } = req.body;

    // check user enter correct email and password or not
    if (!email || !password) {
        return next(
           res.status(400).send("please enter valid password and email")
        );
    }

    // if user found
    const user = await User.findOne({
        email
    }).select("+password");
    // if user mot found
    if (!user) {
        return next(res.status(401).send("please enter valid email or password"));
    }
    // check password
    const passwordCheck = user.comparePassword(password);
    // notmatch
    if (!passwordCheck) {
        next(res.status(401).send("please enter valid password or email"));
    }
    // match
    sendToken(user, 200, res);
   }
   catch(err){
    return res.send({
        message: err.message
    });
   }
};

const getAlluser = async(req,res)=>{
    try{
        const user = await User.find().lean().exec();
        
        if(user){
            return res.status(200).send(user)
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

const userlogOut = async (req, res, next) => {
   try{
    res.cookie("token", null, {
        expires: new Date(Date.now),
        httpOnly: true,
      });
    
      res.status(200).json({
        succsess: true,
        message: "LogOut",
      });
   }
   catch(err){
    return res.send({
        message: err.message
    });
   }
  };

module.exports = {
    userRegistration,userLogin,getAlluser,userlogOut
}
const router = require("express").Router;
const {User,validate} = require("../models/user")
const bcrypt = require("bcrypt");

router.post("/",async (req,res) => {
    try{
        const{error} = validate(req.body);
        if(error){
            return res.status(400).send({message : error.details[0].message});
        }
        const user = await User.findOne({email:req.body.email});
        if(user){
            res.status(409).send({message : "User with given email already exist"});
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password , salt);
    }catch(error){

    }
})


module.exports = router;
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } =require('express-validator');
const config = require('../../config/keys');
const User = require('../../models/User');
// const axio = require('axios')

// @route   POST api/users
// @desc    Tests users route
// @access  Public
router.post('/',[
    check('name','the given name is empty').not().isEmpty(),
    check('email','please include a valid email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({ min: 6 })

], async (req, res) => {
    //check if there are some invalid inputs
    const errors = validationResult(req);
    if ( !errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    //see if the user exist 
    const {name,email,password} = req.body ;
    try{
        // const unsplash = await fetch("https://api.unsplash.com/photos/random/?client_id=R9AJtiUAno7L3s0nPRPAsHQ9i7ezOQ9SHIxf0VvdL0E");
        // const avatar = unsplash.user.profile_image.large;
        global.alert(avatar);
        console.log("fetching user");
        let user = await  User.findOne({email : email});
        if(user){
            res.status(400).json({ errors : [{msg : "User already exists"}]});
        }
        const avatar =gravatar.url(email,{s:'200',s:'pg',d:'mm'},true);
        user = new User({name,email,avatar,password});
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password,salt);

        user.save();
        const payload = {
            user : {
                id : user.id
            }
        }
        jwt.sign(payload,config.secret,{ expiresIn : 35000000 } ,(err,token)=>{ if(err){ throw err } ; res.json({token})});

    } catch(err){
        console.error(err.message);
        res.status(500).send("server error");
    }
    
    

});



module.exports = router;

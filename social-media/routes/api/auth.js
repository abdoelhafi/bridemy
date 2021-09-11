const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/User');
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } =require('express-validator');
const config = require('../../config/keys');

// @route   GET api/auth
// @desc    Tests post route
// @access  Public
router.get('/',auth ,async (req, res) => {

    try{
        const user = await User.findById(req.user.id).select('-password');

        res.json(user);

    }catch(err){
        console.error(err);
        res.status(500).send('server Error');
    }

});

// @route   POST api/auth
// @desc    Tests users route
// @access  Public
router.post('/',[
    check('email','please include a valid email').isEmail(),
    check('password','Password is required').exists()

], async (req, res) => {
    //check if there are some invalid inputs
    const errors = validationResult(req);
    if ( !errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    //see if the user exist 
    const {email,password} = req.body ;
    try{
        console.log("fetching user");
        let user = await  User.findOne({email : email});
        if(!user){
            res.status(400).json({ errors : [{msg : "Username or password invalid"}]});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(400).json({ errors : [{msg : "Username or password invalid"}]});
        }



        
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

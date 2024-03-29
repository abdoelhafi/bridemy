const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } =require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');


// @route   GET api/profile/me
// @desc    Tests profile route
// @access  Private
router.get('/me',auth, async (req, res) => { 
    try{

        const profile = await Profile.findOne({ user : req.user.id }).populate('user',
            ['name','avatar']);
        if ( !profile ){
            res.status(401).json({ msg : 'no profile available for this user'});
        }
        res.json(profile);




    }catch(err){
        console.error(err);
        res.status(500).json({ msg :'server Error'});
    }

});
// @route   POST api/profile
// @desc    Tests profile route
// @access  Private
router.post('/',[auth,[
    check('status','status is required').not().isEmpty(),
    check('skills','skills is required').not().isEmpty()
]], 
    async (req,res) => {
       const errors = validationResult(req);
       if(!errors.isEmpty()){
           return res.status(400).json({ errors : errors.array() });
       }
       const {
        company,
        location,
        website,
        bio,
        skills,
        status,
        githubusername,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook
      } = req.body;
      const profileFields = {};
  
      // Build social object 
      profileFields.social = { youtube, twitter, instagram, linkedin, facebook };
      // Build profile object 
      profileFields.user = req.user.id;
      if(company) profileFields.company =company;
      if ( location) profileFields.location = location ;
      if ( website) profileFields.website = website;
      if ( bio) profileFields.bio =bio ;
      if ( skills) profileFields.skills =skills ;
      if ( status) profileFields.status = status;
      if ( githubusername) profileFields.githubusername = githubusername ;
      if (skills ) {
          profileFields.skills = skills.split(',').map(skill => skill.trim());;
      };
      if( youtube) profileFields.social.youtube = youtube;
      if( twitter) profileFields.social.twitter = twitter;
      if( instagram) profileFields.social.instagram = instagram;
      if( linkedin) profileFields.social.linkedin = linkedin;
      if( facebook) profileFields.social.facebook = facebook;
      
      try{
        const profile = await Profile.findOne({ user : req.user.id });
 
        // update profile 
        if (profile){
            const profile = await Profile.findOneAndUpdate({ user : req.user.id },profileFields,{ new:true });
            res.json(profile);

        }else{
            //create profile
            const profile =  new  Profile(profileFields);
            profile.save();
            res.json(profile);

        }
      }catch(err){
          console.error(err);
          res.status(500).send('server error');
      }
      

      

  


    });

// @route   GET api/profile
// @desc    get all profiles
// @access  Public

router.get('/', async (req,res)=> {

    try{
        const profiles = await Profile.find({}).populate('user',['name','avatar']);
    if (!profiles){
        return res.json({msg : "no profile exist"});

    }
    res.json(profiles);

    }catch(err){
        console.error(err.message);
        res.status(500).send("server error");

    }

    
});
// @route   GET api/profile/user/:user_id
// @desc    get all profiles
// @access  Public
router.get('/user/:user_id',async (req,res)=> {

    try{
        const profile = await Profile.findOne({user : req.params.user_id}).populate('user',['name','avatar']);
    if (!profile){
        return res.status(400).json({msg : "Profile not found"});

    }
    res.json(profile);

    }catch(err){
        console.error(err.message);
        if ( err.kind == 'ObjectId' ){// ????????????????????????????????warning
            return res.status(400).json({msg : "Profile not found"});


        }
        res.status(500).send("server error");

    }
});
// @route   DELETE api/profile
// @desc    delete user profile and posts
// @access  Private
router.delete('/',auth,async (req,res)=> {
    try{
        //delete posts
        await Post.deleteMany({user:req.user.id});
        //delete profile
        await Profile.findOneAndRemove({user : req.user.id});
        // delete user
        await User.findOneAndRemove({_id :req.user.id});
        res.json({msg : "user removed"})
    
    }catch(err){
        console.error(err.message);
        res.status(500).send("server error");

    }
});
// @route   PUT api/profile/experience
// @desc    Fill emty experience array
// @access  Private
router.put('/experience',[auth,[
    check('title','The title is required').not().isEmpty(),
    check('company','The title is required').not().isEmpty(),
    check('location','The location is required').not().isEmpty(),
    check('from','The from field is required').not().isEmpty(),
    check('current','The current is required').not().isEmpty()
]],async (req,res)=> {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body ;
    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try{
        const profile = await Profile.findOne({user : req.user.id});
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);

    
    }catch(err){
        console.error(err.message);
        res.status(500).send("server error");

    }
});
// @route   Delete api/profile/experience/:exp_id
// @desc    delete an  experience from the array
// @access  Private
router.delete('/experience/:exp_id',auth,async (req,res)=> {
    try{
        const profile = await Profile.findOne({user : req.user.id});

        const expIndex = profile.experience.map(exp => exp.id).indexOf(req.params.exp_id);

        profile.experience.splice( expIndex, 1 );

        await profile.save();
        res.json(profile);
    
    }catch(err){
        console.error(err.message);
        res.status(500).send("server error");

    }
});
// @route   PUT api/profile/education
// @desc    Fill empty education array
// @access  Private
router.put('/education',[auth,[
    check('school','The school field is required').not().isEmpty(),
    check('degree','The degree field is required').not().isEmpty(),
    check('from','The from field is required').not().isEmpty()
]],async (req,res)=> {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body ;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try{
        const profile = await Profile.findOne({user : req.user.id});
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send("server error");
    }
});
// @route   Delete api/profile/experience/:exp_id
// @desc    delete an  experience from the array
// @access  Private
router.delete('/education/:edu_id',auth,async (req,res)=> {
    try{
        const profile = await Profile.findOne({user : req.user.id});

        const eduIndex = profile.experience.map(exp => exp.id).indexOf(req.params.edu_id);

        profile.education.splice( eduIndex, 1 );

        await profile.save();
        res.json(profile);
    
    }catch(err){
        console.error(err.message);
        res.status(500).send("server error");

    }
});

module.exports = router;

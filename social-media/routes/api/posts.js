const express = require('express');
const router = express.Router();
const { check , validationResult } = require('express-validator');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route   POST api/posts
// @desc    post users posts
// @access  Private
router.post('/',[auth , [
    check('text','text is required').not().isEmpty()
]] ,
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const newPost = {
            text : req.body.text,
            name : user.name,
            avatar : user.avatar,
            user : req.user.id  
        } 
        const post = new Post(newPost) ;
        await post.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
         
    }

});
// @route   GET api/posts
// @desc    get users posts
// @access  Private
router.get('/',auth, async (req,res) => {
    
    try {
        //const user = await User.findById(req.user.id);
        //const posts =await Post.find({user : user});
        const posts =await Post.find().sort({ date : -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }

});

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Private
router.get('/:id',auth, async (req,res) => {
    
    try {
        const post = await Post.findById(req.params.id);
        if (!post){
            return res.status(404).json({ msg : 'Post not found' });
        }
        res.json(post);
    } catch (err) {

        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({ msg : 'Post not found'})
        }
        res.status(500).send('server error');
    }

});
// @route   DELETE api/posts/:id
// @desc    get users posts
// @access  Private
router.delete('/:id',auth, async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post){
            return res.status(404).json({ msg : 'Post not found' });
        }
        // check if the uder is authorized to delete
        if (post.user.toString() !== req.user.id){
            return res.status(401).json({'msg': "Unauthorized to pursuit action "});
        }
        await Post.findByIdAndRemove({ _id : post.id});

        
        res.json({msg : "post successfully deleted !"});

    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({ msg : 'Post not found'});
        }
        res.status(500).send('server error');
    }
}); 
// @route   PUT api/posts/likes/:id
// @desc    like a post
// @access  Private
router.put('/likes/:id',auth,async (req,res) => {
    try {
        
        const post = await Post.findById(req.params.id);
        if (post.likes.filter(like => like.user.toString() === req.user.id ).length > 0){
            return res.status(404).json({ msg : 'Post already liked' });
        }  
        post.likes.unshift({ user : req.user.id });
        await post.save();
        res.json(post.likes);
    } catch (err) {
       
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({ msg : 'Post not found'});
        }
        res.status(500).send('server error');
    }
});
// @route   PUT api/posts/unlikes/:id
// @desc    unllike posts
// @access  Private
router.put('/unlikes/:id',auth,async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.likes.filter(like => like.user.toString() === req.user.id ).length == 0){
            return res.status(404).json({ msg : 'Post already unliked' });
        }  
        const removeIndex = post.likes.map( like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex,1);
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({ msg : 'Post not found'});
        }
        res.status(500).send('server error'); 
    }
});
// @route   POST api/posts/comment/:id
// @desc    comment on users posts
// @access  Private
router.post('/comment/:id',[auth , [
    check('text','text is required').not().isEmpty()
]] ,
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array() });
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);
        const newComment = {
            text : req.body.text,
            name : user.name,
            avatar : user.avatar,
            user : req.user.id  
        } 
        post.comments.unshift(newComment) ;
        await post.save();
        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
         
    }

});
// @route   DELETE api/posts/comment/:id/:commentId
// @desc    delete a comment
// @access  Private
router.delete('/comment/:id/:commentId',auth, async (req,res) => {
    try {

        const post = await Post.findById(req.params.id);

        const removeIndex =  post.comments.map(Comment => Comment._id.toString()).indexOf(req.params.commentId);
        //check if the index of the comment exist (comment exist)
        if(removeIndex < 0 ){
            return res.status(404).json({msg:'comment does not exist'});
        }
        // check if the user is authorized to delete
        if (post.comments[removeIndex].user.toString() !== req.user.id){
            return res.status(401).json({'msg': "Unauthorized to pursuit action "});
        }
        post.comments.splice(removeIndex,1);
        await post.save();
        
        res.json(post.comments);

    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({ msg : 'comment does not exist'});
        }
        res.status(500).send('server error');
    }
}); 
module.exports = router;

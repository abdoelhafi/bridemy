import React ,{useEffect, Fragment}from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getPost} from '../../../actions/post'
import PostItem from '../PostItem'
import CommentForm from '../post/CommentForm'
import CommentItem from '../post/CommentItem'
import Spinner from '../../layout/Spinner'
import { Link } from 'react-router-dom'


const Post = ({getPost,post:{post,loading},match}) => {
    useEffect(()=> {
        async function fnc() {
            await getPost(match.params.id)
        }
        fnc();
    },[getPost]);

    return loading || post === null ? <Spinner/>:<Fragment>
            <Link to="/posts" class="btn">Retour au discussion</Link>
            <PostItem showActions = {false} post={post}/>
            <CommentForm postId={post._id}/>
            <div className ="comments">
            {post.comments.map(comment => (
                <CommentItem key={comment._id} comment={comment} postId={post._id} />
            ))}
            </div>
        </Fragment> 
       
    
}

Post.propTypes = {
    getPost:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired

} 
const mapStateToProps = state =>  ({
    post:state.post

});

export default connect(mapStateToProps,{getPost})(Post)

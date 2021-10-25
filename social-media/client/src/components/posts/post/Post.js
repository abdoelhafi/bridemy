import React ,{useEffect, Fragment}from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getPost} from '../../../actions/post'
import PostItem from '../PostItem'
import CommentForm from '../post/CommentForm'
import CommentItem from '../post/CommentItem'
import Spinner from '../../layout/Spinner'
import { Link } from 'react-router-dom'
import SidebarProfile from '../../layout/SidebarProfile'


const Post = ({getPost,post:{post,loading},match,profile}) => {
    useEffect(()=> {
        async function fnc() {
            await getPost(match.params.id)
        }
        fnc();
    },[getPost]);

    return loading || post === null ? <Spinner/>:<div className="flex justify-around">
            <div className = "hello w-60">
                <SidebarProfile profile={profile} />
                <Link to="/posts" className="btn mt-4 text-center w-60">Retour au discussion</Link>

            </div>
            <div className ="m-auto">

                <div className = "rounded-full  h-30 mb-6 placeholder-white">
                   <h1 className = "text-6xl text-gray-500 font-medium text-center "> Bridemy  </h1>
                   <h1 className = "text-6xl mt-1 font-medium text-gray-500 text-center "> News Feeds </h1>

                </div>
                <PostItem showActions = {false} post={post}/>
                <CommentForm postId={post._id}/>
                <div className ="comments">
                {post.comments.map(comment => (
                    <CommentItem key={comment._id} comment={comment} postId={post._id} />
                ))}
                </div>
            </div>
        </div> 
    
}

Post.propTypes = {
    getPost:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
} 
const mapStateToProps = state =>  ({
    post:state.post,
    profile:state.profile.profile
});

export default connect(mapStateToProps,{getPost})(Post)

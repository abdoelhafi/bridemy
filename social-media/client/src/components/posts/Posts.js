import React,{Fragment,useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import {getPosts } from '../../actions/post'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm'
import SidebarProfile from '../layout/SidebarProfile'


const Posts = ({getPosts,post:{posts,loading}, profile}) => {
    useEffect(()=> {
        async function fnc() {
            await getPosts()
        }
        fnc();
    },[getPosts]);
        
    return (
        <Fragment>{loading && profile ? <Spinner /> : 
        <div className="flex justify-around">
            <div className="hello w-60" >
                <SidebarProfile showActions={false} profile = {profile}/>
            </div>
            <div className="hello2 m-auto ">
                <div>
                    <div className = "rounded-full  h-30 mb-6 placeholder-white">
                       <h1 className = "text-primary text-6xl text-gray-500 font-medium text-center "> Bridemy  </h1>
                       <h1 className = "text-primary text-6xl mt-1 font-medium text-gray-500 text-center "> News Feeds </h1>

                    </div>
                    <PostForm/>

                </div>
            
                {posts.map(post =>(
                    <PostItem key={post._id} post={post} />
                ))}
            </div>
        
        </div>}
    </Fragment>
    )
}

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,

}
const mapStateToProps = state =>({
    post:state.post,
    profile:state.profile.profile

})
export default connect(mapStateToProps ,{getPosts})(Posts)

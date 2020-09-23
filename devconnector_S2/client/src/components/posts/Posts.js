import React,{Fragment,useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import {getPosts } from '../../actions/post'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'


const Posts = ({getPosts,post:{posts,loading}}) => {
    useEffect(()=> getPosts(),[getPosts]);
    // const [post,setPost] = useState("")
    return (
        <Fragment>{loading ? <Spinner /> : <Fragment>
            {/* {to do} */}
      {posts.map(post =>(
          <PostItem key={post._id} post={post} />
      ))}
        </Fragment>}</Fragment>
    )
}

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,

}
const mapStateToProps = state =>({
    post:state.post

})
export default connect(mapStateToProps ,{getPosts})(Posts)

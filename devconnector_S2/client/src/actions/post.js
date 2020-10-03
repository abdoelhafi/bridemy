import axios from 'axios';
import { GET_POSTS,GET_POST,POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, ADD_COMMENT, REMOVE_COMMENT} from './types'
import { setAlert } from './alert';

//Get posts
export const getPosts = ()=> async dispatch  => {
    try {
        const res = await axios.get('/api/posts');
        dispatch({
            type: GET_POSTS,
            payload:res.data
        });
    } catch (err) { 
        dispatch({
            type: POST_ERROR,
            payload:{ msg: err.response.statusText,status: err.response.status }
        });
    }
}
//Get post by id
export const getPost = (id)=> async dispatch  => {
    try {
        const res = await axios.get(`/api/posts/${id}`);
        dispatch({
            type: GET_POST,
            payload:res.data
        });
    } catch (err) { 
        dispatch({
            type: POST_ERROR,
            payload:{ msg: err.response.statusText,status: err.response.status }
        });
    }
}
// add post 
export const addPost = formData => async dispatch  => {
    const config = {
        headers: {
            'Content_Type':'application/json'
        }
    }
    try {
        const res = await axios.post('/api/posts',formData,config);
        dispatch({
            type: ADD_POST,
            payload:res.data
        });
        dispatch(setAlert('le post est ajoute avec succes','success'));

    } catch (err) { 
        dispatch({
            type: POST_ERROR,
            payload:{ msg: err.response.statusText,status: err.response.status }
        });
        
    }
};
// Add like
export const addLike = postId => async dispatch  => {
    try {
        const res = await axios.put(`/api/posts/likes/${postId}`);
        dispatch({
            type: UPDATE_LIKES,
            payload:{postId ,likes:res.data}
        });
    } catch (err) { 
        dispatch({
            type: POST_ERROR,
            payload:{ msg: err.response.statusText,status: err.response.status }
        });
        
    }
};

//UnLike
export const removeLike = postId => async dispatch  => {
    try {
        const res = await axios.put(`/api/posts/unlikes/${postId}`);
        dispatch({ 
            type: UPDATE_LIKES,
            payload:{postId ,likes:res.data}
        });
    } catch (err) { 
        dispatch({
            type: POST_ERROR,
            payload:{ msg: err.response.statusText,status: err.response.status }
        });
        
    }
}
//delete post
export const deletePost = postId => async dispatch  => {
    try {
        const res = await axios.delete(`/api/posts/${postId}`);
        dispatch({ 
            type: DELETE_POST,
            payload:{postId,msg:res.data}
        });
        dispatch(setAlert('le Poste est supprimé avec succès'),'success')
    } catch (err) { 
        dispatch({
            type: POST_ERROR,
            payload:{ msg: err.response.statusText,status: err.response.status }
        });
        
    }
}
// add Comment 
export const addComment = (postId,formData) => async dispatch  => {
    const config = {
        headers: {
            'Content_Type':'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/posts/comment/${postId}`,formData,config);
        dispatch({
            type: ADD_COMMENT,
            payload:res.data
        });
        dispatch(setAlert('Votre Commentaire est ajouté avec succes','success'));

    } catch (err) { 
        dispatch({
            type: POST_ERROR,
            payload:{ msg: err.response.statusText,status: err.response.status }
        });
        
    }
};
// delete Comment 
export const deleteComment = (postId,commentId) => async dispatch  => {
    
    try {
        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
        dispatch({
            type: REMOVE_COMMENT,
            payload:commentId
        });
        dispatch(setAlert('Votre Commentaire est supprimé avec succes','success'));

    } catch (err) { 
        dispatch({
            type: POST_ERROR,
            payload:{ msg: err.response.statusText,status: err.response.status }
        });
        
    }
};
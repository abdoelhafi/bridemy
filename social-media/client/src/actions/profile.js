import axios from 'axios';
import { setAlert } from './alert';

import {GET_PROFILE,GET_PROFILES,PROFILE_ERROR,UPDATE_PROFILE, CLEAR_PROFILE,ACCOUNT_DELETED} from './types';


//Get current users profile 

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}

        });
        
    }
}
//Get All profiles 

export const getProfiles = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type:GET_PROFILES,
            payload:res.data
        });

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}

        });
         
    }
}
//Get Profile By User ID
export const getProfileByUserId = userId => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}

        });
        
    }
}
// create / update profile
// edit determin wither we update or we creat the profile

export const createProfile = (formData,history,edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content_Type':'application/json'
            }
        }
        const res = await axios.post('/api/profile',formData,config );
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created','success'));
        if(!edit){
            history.push('/dashboard');
        }

        
    } catch (err) {
        const errors = err.response.data.errors;

        if ( errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}

        });
        
    }
}

// add experience
export const addExperience = (formData,history) => async dispatch => {
    try {
        const config = { 
            headers: {
                'Content_Type':'application/json'
            }
        }
        const res = await axios.put('/api/profile/experience',formData,config );
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });
        dispatch(setAlert('Experience Added','success'));
        
        history.push('/dashboard');
        

        
    } catch (err) {
        const errors = err.response.data.errors;

        if ( errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}

        });
        
    }
}
// add education
export const addEducation = (formData,history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content_Type':'application/json'
            }
        }
        const res = await axios.put('/api/profile/education',formData,config );
        console.log(res+"here is it ");
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });
        dispatch(setAlert('Education Added','success'));
        
        history.push('/dashboard');
        

    } catch (err) {
        const errors = err.response.data.errors;

        if ( errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}

        });
        
    }
}
// Delete Experienece

export const deleteExperience = id => async dispatch =>{
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);
        dispatch ({
            type : UPDATE_PROFILE,
            payload : res.data
        });
        dispatch(setAlert('Experience supprime avec succes','success'));

    } catch (err) { 
        dispatch({
            type:PROFILE_ERROR,
            payload : { msg : err.response.statusText,status: err.response.status }
        }); 
    }
}
// Delete Education

export const deleteEducation = id => async dispatch =>{
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);
        dispatch ({
            type : UPDATE_PROFILE,
            payload : res.data
        });
        dispatch(setAlert('Education supprime avec succes','success'));

    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload : { msg : err.response.statusText,status: err.response.status }
        }); 
    }
}
// Delete Account and profile
export const deleteAccount = () => async dispatch =>{
    if(window.confirm('Etes-vous sure vous voulez proceder cette operation!')){
        try {
            await axios.delete('/api/profile');
            dispatch ({type : CLEAR_PROFILE});
            dispatch ({type : ACCOUNT_DELETED});
            dispatch(setAlert('Votre Compte est supprime'));
    
        } catch (err) {
            dispatch({
                type:PROFILE_ERROR,
                payload : { msg : err.response.statusText,status: err.response.status }
            }); 
        }
    }
}
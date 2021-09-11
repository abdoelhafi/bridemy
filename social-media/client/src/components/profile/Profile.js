import React,{Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import {connect} from "react-redux";
import Spinner from '../layout/Spinner'
import {getProfileByUserId} from '../../actions/profile';
import { Link } from 'react-router-dom';

const Profile = ( { getProfileByUserId,profile:{profile,loading},auth,match} ) => {
    useEffect( ()=> {
        getProfileByUserId(match.params.id);
    },[getProfileByUserId,match.params.id]);
    return (
        <Fragment>
            {profile== null || loading ? <Spinner />:<Fragment>
            <Link to ='/profiles' className="btn btn-light ">retour à la liste des instructeurs</Link>
            {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id 
            && (<Link to ='/edit-profile' className ='btn  btn-dark'>modifier mon profile</Link>)}
            <div class="profile-grid my-1">
                <ProfileTop profile={profile} />
                <ProfileAbout profile={profile} />
                <div class="profile-exp bg-white p-2">
                   <h2 class="text-primary">Experience</h2>
                   {profile.experience.length >0 ? (<Fragment>
                       {profile.experience.map(experience => (<ProfileExperience key ={experience._id} experience={experience} />))}
                   </Fragment>):(<h4>Aucune experience professionnel</h4>)}
                </div>
                <div class="profile-edu bg-white p-2">
                   <h2 class="text-primary">Education</h2>
                   {profile.education.length >0 ? (<Fragment>
                       {profile.education.map(education => (<ProfileEducation key ={education._id} education={education} />))}
                   </Fragment>):(<h4>Aucune education/formation academique</h4>)}
                </div>
            </div>

            </Fragment>}
        </Fragment>
    )
}
Profile.propTypes = {
    getProfileByUserId:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    auth : PropTypes.object.isRequired


}
const mapStateToProps =state =>({
    profile:state.profile,
    auth:state.auth
});

export default connect(mapStateToProps,{getProfileByUserId})(Profile)

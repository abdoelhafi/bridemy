import React ,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import { getProfiles} from '../../actions/profile'
import ProfileItem from './ProfileItem';

const Profiles = ({getProfiles,profile:{profiles,loading}}) => {
    useEffect(()=> { getProfiles();},[getProfiles]);
    return (
        <Fragment>
        {loading? <Spinner />:<Fragment>
            <h1 className="large text-primary" >Instructeurs</h1>
            <p className="lead" ><i className=" fab fa-connectdevelop"></i> Rester en contacte avec vos instructeurs</p>
            <div className ="profiles">
                { profiles.length>0 ?(profiles.map( profile => (
                    <ProfileItem key ={ profile._id} profile={ profile}/>
                ))):<h4> no Profile found </h4>}
            </div>
        </Fragment>}
            
        </Fragment>
    )
}

Profiles.propTypes = {
    getProfiles:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired

}
const mapStateToProps = state => ({
    profile:state.profile
});

export default  connect(mapStateToProps,{getProfiles})(Profiles); 

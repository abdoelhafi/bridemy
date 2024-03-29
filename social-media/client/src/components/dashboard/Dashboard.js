import React,{useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect } from 'react-redux';
import {getCurrentProfile, deleteAccount} from '../../actions/profile';
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'


import Spinner from '../layout/Spinner';


const Dashboard = ({getCurrentProfile,deleteAccount ,auth:{user},profile:{loading,profile}}) => {

    useEffect(()=>{
        getCurrentProfile();
    },[getCurrentProfile]);
    return loading && profile == null ? <Spinner/> : <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead" >
            <i className="fas fa-user"></i> Welcome { user && user.name}
        </p>
        {profile !== null ? <Fragment>
            <DashboardActions />
            <Experience experience ={ profile.experience}/>
            <Education education ={ profile.education}/>

            <div className= "my-2">
               <button className="btn btn-danger" onClick={() => deleteAccount()}>
               <i className="fa fa-user-minus"></i> Supprimer Mon Compte

               </button>

            </div>
        </Fragment>:<Fragment>
        <p> Vous n'avez pas encore de compte </p>
        <Link to='/create-profile' className="btn btn-primary my-1">Créer Votre profile</Link>
        </Fragment>}

    </Fragment>;
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,
    deleteAccount:PropTypes.func.isRequired

}
const mapStateToProps =state => ({
    auth : state.auth,
    profile: state.profile

});

export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard) ;

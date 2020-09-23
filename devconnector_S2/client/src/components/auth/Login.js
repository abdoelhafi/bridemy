import React, {Fragment,useState} from 'react';
import {Link , Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';


const Login = ({login ,isAuthenticated}) => {
    const [formData,setFormData] = useState({
        email : "",
        password: "" ,
    });
    const {email,password} = formData ;

    const handleChange = (e) => {
        const changed = e.target.name; 
        const newVal = e.target.value;
        setFormData( previous => { return {
            ...previous,
            [changed] : newVal
        }
        });
    }
    const handleSubmit = async e =>{
        e.preventDefault();
        login(email,password);        
        
    };
    //redirect if logged in 
    if ( isAuthenticated){
        return <Redirect to ="/dashboard" />
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Se connecter</h1>
            <p className="lead">
                <i className="fas fa-user"></i>
                Se connecter a votre compte</p>
            <form className="form" onSubmit = {handleSubmit}>
                
                <div className="form-group">
                    <input type="email" placeholder="Email Address"  onChange = {handleChange} value = {email} name="email"/>
                    <small className="form-text"></small>
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" onChange = {handleChange} value = {password} name="password" minLength="6"/>
                </div>
                <input type="submit" className="btn btn-primary" value="Login"/>
            </form>
            <p className="my-1">
                Vous n'avez pas encore un compte ?
                <Link to ="register">Se connecter</Link>
            </p>

        </Fragment>
    )
};
Login.prototypes = {
    login : PropTypes.func.isRequired,
    isAuthenticated : PropTypes.bool
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps,{login})(Login);

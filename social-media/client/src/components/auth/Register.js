import React, {Fragment,useState} from 'react';
import { connect } from 'react-redux';
import {Link,Redirect} from 'react-router-dom';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import PropTypes from 'prop-types'


// import axios from 'axios';

const Register = ({setAlert,register,isAuthenticated}) => {
    const [formData,setFormData] = useState({
        name : "",
        email : "",
        password: "" ,
        password2 : ""
    });
    const {name,email,password,password2} = formData ;

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
        if ( password !== password2 ){
            setAlert("password not match",'danger');
        }else{
            register({name,email,password});
////## make a post request to register the new user ---------!!!first uncomment axios imprtation above---------------------------
            // console.log(formData);
            // const newUser = {
            //     name :name,
            //     email:email,
            //     password:password,
            // };
            
            // try {
            //     const config = {
            //         headers : {
            //             'content-Type' : 'application/json'
            //         }
            //     };
            //     const body = JSON.stringify(newUser);
            //     const result = await axios.post('api/users',body,config);
            //     console.log(result.data);
                
            // } catch (err) {
            //     console.log(err.message);
            // }
////## ---------------------------------------------------------------------------------            
        }
    };
    if(isAuthenticated){
        return <Redirect to = '/posts' />;
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Inscription</h1>
            <p className="lead">
                <i className="fas fa-user"></i>
                Creer votre compte</p>
            <form className="form" onSubmit = {handleSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="Nom Complet" name="name" value = {name} onChange = {handleChange}  />
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Address Email "  onChange = {handleChange} value = {email} name="email"/>
                    <small className="form-text"></small>
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Mot de Passe" onChange = {handleChange} value = {password} name="password" />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirmer le Mot de Passe "
                        name="password2"
                        value = {password2}
                        onChange = {handleChange}
                        />
                    
                </div>
                <input type="submit" className="btn btn-primary" value="Register"/>
            </form>
            <p className="my-1">
                Avez vous deja un compte?
                <Link to="login">Se connecter</Link>
            </p>

        </Fragment>
    )
}
Register.prototypes = {
    setAlert : PropTypes.func.isRequired,
    register:PropTypes.func.isRequired,
    isAuthenticated : PropTypes.bool
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps ,{setAlert,register})(Register);
// export default Register ; 
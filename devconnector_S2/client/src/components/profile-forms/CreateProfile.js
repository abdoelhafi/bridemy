import React,{useState,Fragment} from 'react';
import { withRouter,Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { createProfile} from '../../actions/profile'
const CreateProfile = ({createProfile,history}) => {
    const [formData ,setFormData ] = useState({
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: ''
    });
    const [displaySocialInputs,toggleSocialInputs] = useState(false);
    const {
      company ,
      website ,
      location ,
      status, 
      skills,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram
    }= formData;
    const handleChange = e => setFormData({...formData,[e.target.name]:e.target.value});
    const handleSubmit = e => { 
        e.preventDefault();
        createProfile(formData,history);
    }


    return (
        <Fragment>
        <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = Champs obligatoires</small>
      <form className="form" onSubmit ={ e => handleSubmit(e)}>
        <div className="form-group">
          <select name="status" value ={status} onChange={e => handleChange(e)} >
            <option value="0">* vous êtes actuellement</option>
            <option value="Etudiant au Maroc">Etudiant au Maroc</option>
            <option value="Etudiant à l'étranger">Etudiant à l'étranger</option>
            <option value="Précédemment étudier à l'étranger">Précédemment étudier à l'étranger</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Ecole,Université ou Entreprise" value ={company} onChange={e => handleChange(e)} name="company" />
          <small className="form-text"
            >Nom de l'Ecole ou Université ou Entreprise </small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Site Web" value ={website} onChange={e => handleChange(e)} name="website" />
          <small className="form-text"
            >Site web de l'école ou entreprise</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Emplacement" value ={location} onChange={e => handleChange(e)} name="location" />
          <small className="form-text"
            >Ville ou province</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Domain" value ={skills} onChange={e => handleChange(e)} name="skills" />
          <small className="form-text"
            >Entrer des mot clees indicants le type d'etude ou filiere sepapre par une vergule (eg.
            Data science,Math Applique,Informatique)</small>
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" value ={bio} onChange={e => handleChange(e)} name="bio"></textarea>
          <small className="form-text">Quelques mots apropos de vous ...</small>
        </div>

        <div className="my-2">
          <button type="button" onClick={()=> toggleSocialInputs(!displaySocialInputs) } className="btn btn-light">
            Ajouter vos liens des resaux sociaux
          </button>
          <span>Optionel</span>
        </div>
        {displaySocialInputs && <Fragment>
            <div className="form-group social-input">
          <i className="fab fa-twitter fa-2x"></i>
          <input type="text" placeholder="Twitter URL" value ={twitter} onChange={e => handleChange(e)} name="twitter" />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x"></i>
          <input type="text" placeholder="Facebook URL" value ={facebook} onChange={e => handleChange(e)} name="facebook" />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-youtube fa-2x"></i>
          <input type="text" placeholder="YouTube URL" value ={youtube} onChange={e => handleChange(e)} name="youtube" />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x"></i>
          <input type="text" placeholder="Linkedin URL" value ={linkedin} onChange={e => handleChange(e)} name="linkedin" />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input type="text" placeholder="Instagram URL" value ={instagram} onChange={e => handleChange(e)} name="instagram" />
        </div>

        </Fragment>}

        
        <input type="submit" className="btn btn-primary my-1" />
        <Link to ="/dashboard" className="btn btn-light my-1">Retour</Link>
      </form>
            
        </Fragment>
    )
}
CreateProfile.prototypes = {
    createProfile: PropTypes.func.isRequired
}

export default connect(null,{createProfile})(withRouter(CreateProfile));
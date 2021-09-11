import React,{Fragment,useState} from 'react'
import { Link,withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { addEducation} from '../../actions/profile'

const AddEducation = ({addEducation, history}) => {
    const [formData ,setFormData] = useState({
        school:'',
        degree:'',
        fieldofstudy:'',
        from:'',
        to:'',
        current:'',
        description:''
    });

    const [toDateDisabled,toggleDisable]= useState(false);
    const { school,degree,fieldofstudy,from,to,current,description} = formData;

    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    const handleSubmit = e => {
        e.preventDefault();
        addEducation(formData,history);
    }

    return (
        <Fragment>
        <h1 className="large text-primary">
       Add Education
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any school you passed in
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit ={e => handleSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="* Ecole ou Formation" value={school} onChange={e => handleChange(e)} name="school"  />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* degree" value={degree} onChange={e => handleChange(e)} name="degree"  />
        </div>
        <div className="form-group">
          <input type="text" placeholder="field of Study" value={fieldofstudy} onChange={e => handleChange(e)} name="fieldofstudy" />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" value={from} onChange={e => handleChange(e)} name="from" />
        </div>
         <div className="form-group">
          <p><input type="checkbox" value={current} onChange={e => {
              setFormData({...formData,current:!current});
              toggleDisable(!toDateDisabled);
          }} name="current" checked={current}  /> {' '}Actuel</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" value={to} onChange={e => handleChange(e)} name="to" disabled={toDateDisabled ? 'disabled':''} />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            value={description} onChange={e => handleChange(e)}
            rows="5"
            placeholder="program Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link to ="dashboard" className="btn btn-light my-1" >Go Back</Link>
      </form>
            
        </Fragment>
    )
}

addEducation.propTypes = {
    addEducation : PropTypes.func.isRequired,

}

export default connect(null,{addEducation})(withRouter( AddEducation));

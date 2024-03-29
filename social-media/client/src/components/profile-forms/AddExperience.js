import React,{Fragment,useState} from 'react'
import { Link,withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { addExperience} from '../../actions/profile'

const AddExperience = ({addExperience, history}) => {
    const [formData ,setFormData] = useState({
        company:'',
        title:'',
        location:'',
        from:'',
        to:'',
        current:'',
        description:''
    });

    const [toDateDisabled,toggleDisable]= useState(false);
    const { company,title,location,from,to,current,description} = formData;

    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    const handleSubmit = e => {
        e.preventDefault();
        addExperience(formData,history);
    }

    return (
        <Fragment>
        <h1 className="large text-primary">
       Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit ={e => handleSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="* Job Title" value={title} onChange={e => handleChange(e)} name="title" required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" value={company} onChange={e => handleChange(e)} name="company" required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" value={location} onChange={e => handleChange(e)} name="location" />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" value={from} onChange={e => handleChange(e)} name="from" />
        </div>
         <div className="form-group">
          <p><input type="checkbox" value={current} onChange={e => {
              setFormData({...formData,current:!current});
              toggleDisable(!toDateDisabled);
          }} name="current" checked={current}  /> {' '}Current Job</p>
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
            placeholder="Job Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link to ="dashboard" className="btn btn-light my-1" >Go Back</Link>
      </form>
            
        </Fragment>
    )
}

AddExperience.propTypes = {
    addExperience : PropTypes.func.isRequired,

}

export default connect(null,{addExperience})(withRouter(AddExperience))

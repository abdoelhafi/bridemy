import React,{Fragment} from 'react'
import {connect} from  'react-redux'
import Moment from 'react-moment'
import PropTypes from 'prop-types'
import {deleteExperience} from '../../actions/profile'

const Experience = ({experience,deleteExperience}) => {
    const experiences = experience.map(exp =>(
        <tr key = {exp.id} >
            <td>{exp.company}</td>
            <td className = "hide-sm">{exp.title}</td>
            <td>
                <Moment format ='YYYY/MM/DD'>{exp.from}</Moment> -{exp.current != null ? 'Now': exp.to}
            </td>
            <td>
                <button className ='btn btn-danger' onClick={() => handleDeleteBtn(exp.id)} >Suprimer</button>
            </td>

        </tr>
    ));
    const handleDeleteBtn = (id) => {
        deleteExperience(id)
    }

       
    
    return (
        <Fragment>
            <h2 className="my-2">Experience professionnel</h2>
            <table className ="table">
                <thead>
                    <tr>
                        <th> Organisme</th>
                        <th className="hide-sm" > titre</th>
                        <th className="hide-sm" > Annee</th>

                    </tr>
                </thead>
                <tbody>
                    {experiences}
                </tbody>
            </table>
        </Fragment>
    )
}

Experience.propTypes = {
    experiences:PropTypes.array.isRequired,
    deleteExperience:PropTypes.func.isRequired

}

export default connect(null,{deleteExperience})(Experience)

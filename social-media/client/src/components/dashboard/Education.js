import React,{Fragment} from 'react'
import {connect} from  'react-redux'
import Moment from 'react-moment'
import PropTypes from 'prop-types'
import {deleteEducation} from '../../actions/profile'

const Education = ({education,deleteEducation}) => {
    const educations = education.map(edu =>(
        <tr key = {edu.id} >
            <td>{edu.school}</td>
            <td className = "hide-sm">{edu.degree}</td>
            <td>
                <Moment format ='YYYY/MM/DD'>{edu.from}</Moment> -{edu.current != null ? 'Now': edu.to}
            </td>
            <td>
                <button className ='btn btn-danger' onClick={ ()=> handleDeleteBtn(edu.id)} >Suprimer</button>
            </td>

        </tr>
    ));
    const handleDeleteBtn = (id) => deleteEducation(id);

       
    
    return (
        <Fragment>
            <h2 className="my-2">Acheivement Academiques</h2>
            <table className ="table">
                <thead>
                    <tr>
                        <th> Ecole</th>
                        <th className="hide-sm" > Diplome</th>
                        <th className="hide-sm" > Annee</th>

                    </tr>
                </thead>
                <tbody>
                    {educations}
                </tbody>
            </table>
        </Fragment>
    )
}

Education.propTypes = {
    educations:PropTypes.array.isRequired,
    deleteEducation:PropTypes.func.isRequired

}
export default connect(null,{deleteEducation})(Education);

// export default connect(null,{education})(Education)

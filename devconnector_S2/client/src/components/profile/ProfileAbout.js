import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
const ProfileAbout = ({profile:{
    bio,skills,user:{name }
}}) => {
    return (
        <div class="profile-about bg-light p-2">
        {bio && <Fragment >
            <h2 class="text-primary">La biography de {name.trim().split(' ')[0]}</h2>
          <p>
            {bio}
          </p>
          <div class="line"></div>
        </Fragment>}
        <h2 class="text-primary">Domaines d'intérêt</h2>
          <div class="skills">
          {skills.map(skill => (<div class="p-1"><i class="fa fa-check-circle"></i> {skill}</div>))}
          </div>
        </div>
    )
}

ProfileAbout.propTypes = {
    profile:PropTypes.object.isRequired

}

export default ProfileAbout

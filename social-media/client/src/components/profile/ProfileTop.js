import React from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({profile:{
    status,
    company,
    location,
    website,
    social:{twitter,facebook,linkedin,youtube,instagram},
    user:{name,avatar}

}}) => {
    return (
        <div class="profile-top bg-primary p-2">
        <img
          class="round-img my-1"
          // src={avatar}
          src= "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU"
          alt=""
        />
        <h1 class="large">{name}</h1>
        <p class="lead">{status} à {company && <span>{company}</span>}</p>
        <p>{location && <span>{location}</span>}</p>
        <div class="icons my-1">
        { website && (<a href={website} target="_blank" rel="noopener noreferrer">
            <i class="fas fa-globe fa-2x"></i>
          </a>)}
        { twitter && (<a href={twitter} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-twitter fa-2x"></i>
          </a>)}
          { facebook && (<a href={facebook} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-facebook fa-2x"></i>
          </a>)}
          { linkedin && (<a href={linkedin} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-linkedin fa-2x"></i>
          </a>)}
          { youtube && (<a href={youtube} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-youtube fa-2x"></i>
          </a>)}
          { instagram && (<a href={instagram} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-instagram fa-2x"></i>
          </a>)}
          
        </div>
      </div>

    )
}

ProfileTop.propTypes = {
    profile:PropTypes.object.isRequired

}

export default ProfileTop

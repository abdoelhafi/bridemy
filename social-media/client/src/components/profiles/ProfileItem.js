import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const ProfileItem = ({profile:{
    user:{_id, name,avatar},
    status,
    company,
    location,
    skills
}}) => {
    return (
        <div className="profile bg-light">
        {/* <img src={avatar} className="round-img" alt=""></img> */}
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU" className="round-img" alt=""></img>

        <div>
            <h2>{name}</h2>
            <p> {status} {company && <span>à {company} </span>}</p>
            <p className="my-1">{location && <span> {location} </span>}</p>
            <Link to ={`/profile/${_id}`} className="btn btn-primary"> voir le profile complet </Link>
        </div>
        <ul>
            {skills.slice(0,4).map((skill,index)=>(
                <li key={index} className="text-primary skill"><i class="fas fa-check-circle"></i>  { skill}</li>
            ))}
        </ul>
            
        </div>
    )
}

ProfileItem.propTypes = {
    profile:PropTypes.object.isRequired,

}

export default ProfileItem

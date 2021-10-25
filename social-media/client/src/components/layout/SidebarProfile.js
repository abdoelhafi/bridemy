import React,{Fragment} from 'react'
import gravatar from 'gravatar'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
const img = require('../../img/showcase.jpg')

const SidebarProfile = ({profile}) => {
    const name = profile?.profile?.user?.name
    const bio = profile?.profile?.bio
    const status = profile?.profile?.status
    // global.alert(JSON.stringify(profile))

    return (
        <Fragment>
            <div className = "flex-initial text-ceneter bg-gray-200 pb-8">
                <div className = "bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 w-full h-24">
                </div>
                <div className="flex justify-center items-end">
                    <img className= " rounded-full absolute h-24 w-24" src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=785&q=80" />
                    <span className = "z-10 text-blue-500"><i class="fas fa-pen"></i></span>
                </div>
                <div className = "text-center">
                    <h1 className="text-2xl mt-3 text-base text-blue-1000"> {name}</h1>
                    <h4 className="text-bule-400"> {status}</h4>
                    <p className="text-gray-500"> {bio}</p>

                </div>

            </div>
        </Fragment> 
    )
}
SidebarProfile.defaultProps ={
    showActions:true
  }
  
SidebarProfile.propTypes = {
    profile : PropTypes.object.isRequired,
  
  }
  const mapStateToProps = state => ({
      profile: state.profile
  });
export default connect(mapStateToProps,{})(SidebarProfile)
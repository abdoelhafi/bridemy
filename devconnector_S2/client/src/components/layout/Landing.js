import React from 'react'
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const Landing = ({isAuthenticated}) => {
    if(isAuthenticated){
        return <Redirect to= '/Dashboard'/>
    }
    return (
        <div>
            <section className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                        <h1 className="x-large"> <span style = {{color : "aqua"}}>Bri</span>dge Aca<span style = {{color : "aqua"}}>demy</span> </h1>
                        <p className="lead">
                            Renconter votre mentor qui vous guidera tous au long de votre parcours.
                        </p>
                        <div className="buttons">
                            <Link to ="register" className="btn btn-primary">Inscription</Link>
                            <Link to ="login" className="btn btn-light">Connexion</Link>
                       </div>
                    </div>
                </div>
                
            </section>

        </div>
    )
}

Landing.prototype = {
    isAuthenticated:PropTypes.bool
}

const mapStateToProps =state => ({
    isAuthenticated : state.auth.isAuthenticated
});


export default connect(mapStateToProps)(Landing);

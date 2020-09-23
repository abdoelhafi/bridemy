import React ,{Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth'
import { connect } from 'react-redux';
//rafc
const Navbar = ({auth : {isAuthenticated , loading },logout  }) => {
  const authLinks = (
    <ul>
        <li><Link to="Dashboard"><i className="fas fa-user"></i>{'  '} <span className="hide-sm">Dashboard</span></Link></li>
        <li><Link to="profiles">Instructeurs</Link></li>
        <li><Link to="posts"><i className="fas fa-arow"></i>{'  '} <span className="hide-sm">Posts</span></Link></li>
        <li><Link to ="login" onClick={logout}> <i className="fas fa-sign-out-alt"></i>{'  '} <span className="hide-sm">Logout</span></Link></li>

      </ul>

  );
  const guestLinks = (
    <ul>
        <li><Link to="/profiles">Instructeurs</Link></li>
        <li><Link to="/register">Inscription</Link></li>
        <li><Link to="/login">Connexion</Link></li>
      </ul>


  );
    return (
        <div>
    <nav className="navbar bg-dark">
      <h1>
        <Link to ="/" style = {{color : "aqua"}} ><i className="fas fa-school"></i> Bridemy</Link>
      </h1>
      {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
    </nav>            
        </div> 
    )
}
Navbar.propTypes = {
  logout:PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps,{logout})(Navbar);



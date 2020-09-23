import React, {Fragment ,useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import  Register  from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';
if(localStorage.token) {
    setAuthToken(localStorage.token);
}
const App = () => {
    useEffect( ()=> {
        store.dispatch(loadUser());
    },[]);
    return (
    <Provider store = {store}>
        <Router>
            <Fragment>
                <Navbar/>
                <Route exact="exact" path="/" component={Landing}/>
                <section className="container">
                    <Alert />
                    <Switch>
                        <Route exact="exact" path="/login" component={Login}/>
                        <Route exact="exact" path="/register" component={Register}/>
                        <Route exact="exact" path="/profiles" component={Profiles}/>
                        <Route exact="exact" path="/profile/:id" component={Profile}/>
                        <PrivateRoute exact="exact" path="/dashboard" component={Dashboard}/>
                        <PrivateRoute exact="exact" path="/create-profile" component={CreateProfile}/>
                        <PrivateRoute exact="exact" path="/edit-profile" component={EditProfile}/>
                        <PrivateRoute exact="exact" path="/add-experience" component={AddExperience}/>
                        <PrivateRoute exact="exact" path="/add-education" component={AddEducation}/>
                        <PrivateRoute exact="exact" path="/posts" component={Posts}/>


                    </Switch>
                </section>
            </Fragment>
        </Router>
    </Provider>
)};

export default App;
/**
 * Contains the base class of the front end.
 */
'use strict';

import React from 'react';
import LoginForm from './containers/login_form';
import HeaderBar from './containers/header';
import HTTPTest from './containers/http_request';
import ProjectPage from './containers/projects';
import {Router, Route, Link, browserHistory} from 'react-router';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "../static/css/index.css";

/**
 * class responsible for creating the first-rendered React component
 */
class App extends React.Component {
    /**
     * Constructs the base method, takes in a unique name for the
     * app component, and sets the props and state for the component
     *
     * @param {object} props The properties of this component
     */
    constructor(props){
        super(props);
        this.props = props;
    }

    /**
     * @returns {XML} The component to be rendered
     */
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={LoginForm}/>
                <Route path="http_test" component={HTTPTest}/>
                <Route path="/projects" component={ProjectPage}/>
            </Router>
        )
    }
}

export default App;

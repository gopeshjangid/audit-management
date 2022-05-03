import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { validateToken } from '../services/service.validateAouthTokens';

const getIdToken = (key) =>{

        var matches = window?.location?.href?.match(new RegExp(key+'=([^&]*)'));
        if(!matches){
             return null;
        }
        console.log("matches=======" ,matches)
        matches = matches.length ? matches[0] : null;
        if(!matches){
            return null;
        }
        matches = matches.split("=")[1]

        console.log("matches====final" ,matches)
        return matches || null;
     
}

const PrivateRoute = ({ component: Component, ...rest }) => {
    let token = getIdToken("access_token");
    if(!token){
        token = localStorage.getItem('idToken')
    } else {

        console.log("setting token" ,token)
        localStorage.setItem('idToken' ,token)
    }

    console.log("token-------------" ,token)
    //const alreadySigned = sessionStorage.getItem('userSignedIn');
    //validateToken.init();
    return (
        <Route
            {...rest}
            render={() => {
                return token ? <Component {...rest} /> : <Redirect to="/" />
            }} />
    )
}

export default PrivateRoute;
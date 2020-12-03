import React, { useState } from 'react';
import { Redirect } from "react-router-dom";

const Main = () => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));

    if(!localStorage.getItem('user')){
        return <Redirect to="sign-in" />
    }

    const logout = () => {
        localStorage.removeItem('user');
        setCurrentUser('');
    }

    return (
        <div>
            <h1>Main</h1>
            <h3>{ currentUser.name }</h3>
            <h3>{ currentUser.email }</h3>
            <h3>{ currentUser.idToken }</h3>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Main;

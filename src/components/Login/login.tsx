import AuthMenu from "../../auth0/AuthMenu"
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';

import "./login.css"
const Login = () => {

    return (<>
        <div className="App">
            <header>
                <div className="logo">
                    <img src="logo.png" alt="Fintegrate" />
                </div>
                <AuthMenu />
              
            </header>
        </div>
    </>)
}
export default Login
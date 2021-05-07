import React, { useState } from 'react';
import AuthOptions from "../../components/auth/auth options";
import RegisterForm from "../../components/auth/register form";
import LoginForm from "../../components/auth/loginForm";
import BackgroundAuth from "../../assets/jpg/background-auth.jpg";
import LogoNameWave from "../../assets/png/logo-name-white.png";

import "./auth.scss";

export default function Auth() {

    const [selectedForm, setSelectedForm] = useState(null);

    const handlerForm = () => {
        switch (selectedForm) {
            case "login":
                return <LoginForm setSelectedForm={setSelectedForm}/>;
            case "register":
                return <RegisterForm setSelectedForm={setSelectedForm}/>;        
            default:
                return <AuthOptions setSelectedForm={setSelectedForm} />
        }
    }

    return (
        <div className="auth" 
             style={{backgroundImage:`url(${BackgroundAuth})`}}
        >
            <div className="auth__dark"/>
            <div className="auth__box">
                <div className="auth__box-logo">
                    <img src={LogoNameWave} alt="Musicfy" />
                </div>
                {handlerForm()}
            </div>
        </div>
    )
}

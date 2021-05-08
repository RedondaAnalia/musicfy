import React from 'react';
import { Icon, Image } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import firebase from "../../utils/firebase";
import "firebase/auth";

import UserImage from "../../assets/png/user.png";
import './topBar.scss'


function TopBar(props) {
    const { user, history } = props;

    const logOut = ()=>{
        firebase.auth().signOut();
    }
    
    const goBack = ()=>{
        history.goBack();
    }
    
    return (
        <div className="top-bar">
            <div className="top-bar__left">
                <Icon name="angle left" onClick={goBack}/>

            </div>
            <div className="top-bar__right">
                <Link to="/settings">
                    <Image src= {UserImage} />
                    {user.displayName}
                </Link>
                <Icon name="power off" onClick={logOut} />

            </div>

        </div>
    )
}

export default withRouter(TopBar);

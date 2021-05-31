import React from 'react'
import { Switch, Route } from 'react-router-dom';

//Pages
import Home from "../pages/home";
import Settings from "../pages/settings";

export default function Routes(props) {
    const { user,setReloadApp }= props;

    console.log(props);

    return (
        <Switch>
            <Route path="/" exact>
                <Home/>
            </Route>
            <Route path="/artists" exact>
                <h1>Artistas</h1>
            </Route>
            <Route path="/settings"  exact>
                <Settings   user= {user} 
                            setReloadApp={setReloadApp}/>
            </Route>
        </Switch>
    )
}

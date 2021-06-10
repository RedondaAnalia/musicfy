import React from 'react'
import { Switch, Route } from 'react-router-dom';

//Pages
import Home from "../pages/home";
import Settings from "../pages/settings";
import Artist from '../pages/artist';
import Artists from '../pages/artists';
import Albums from "../pages/albums";
import Album from "../pages/album";

export default function Routes(props) {
    const { user,setReloadApp, playerSong }= props;

    return (
        <Switch>
            <Route path="/" exact>
                <Home playerSong={playerSong}/>
            </Route>
            <Route path="/artists" exact>
                <Artists />
            </Route>
            <Route path="/artist/:id" exact>
                <Artist playerSong={playerSong} />
            </Route>
            <Route path="/albums" exact>
                <Albums />
            </Route>
            <Route path="/album/:id" exact>
                <Album playerSong={playerSong}/>
            </Route>
            <Route path="/settings"  exact>
                <Settings   user= {user} 
                            setReloadApp={setReloadApp}/>
            </Route>
        </Switch>
    )
}

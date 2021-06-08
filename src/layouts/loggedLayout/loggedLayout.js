import React, { useState } from 'react';
import{ Button, Grid, GridRow } from 'semantic-ui-react';
import { BrowserRouter as Router } from "react-router-dom";
import MenuLeft from '../../components/menu left';
import TopBar from '../../components/top bar';
import Player from '../../components/player';

import Routes from "../../routes/routes";
import "./loggedLayout.scss";

export default function LoggedLayout(props) {
    const {user,setReloadApp} = props
    const [songData, setSongData] = useState({})

    const playerSong = (albumImage, songName, songUrl) =>{
        setSongData({
            image:albumImage,
            name:songName,
            url: songUrl
        })
    }

    const image1 = 'https://firebasestorage.googleapis.com/v0/b/musicfy-55d9a.appspot.com/o/album%2F006ee08c-b617-4e51-9a0d-3d2ecf40fe49?alt=media&token=b30724b0-2575-4205-9561-d8db41f36036';
    const name1 = 'Efectos Colaterales';
    const url1= "https://firebasestorage.googleapis.com/v0/b/musicfy-55d9a.appspot.com/o/song%2FS%C3%ADlvia%20Tom%C3%A0s%20Trio%20-%20Ja%20passat%20el%20temps.mp3?alt=media&token=fe4d7aad-7d50-46f0-9e02-62f475ca74cc";
    

    return (
    <Router>
        <Grid className="logged-layout">
            <Grid.Row>
                <Grid.Column width={3}>
                    <button onClick={()=>playerSong(image1, name1, url1)}>Start</button>
                    <MenuLeft user={user}/>
                </Grid.Column>
                <Grid.Column className= "content" width={13}>
                    <TopBar user= {user} />
                    <Routes user= {user} setReloadApp={setReloadApp}></Routes>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={16}>
                    <Player songData={songData}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Router>
    )
}

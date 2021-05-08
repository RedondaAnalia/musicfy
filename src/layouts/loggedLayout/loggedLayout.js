import React from 'react';
import{ Grid, GridRow } from 'semantic-ui-react';
import { BrowserRouter as Router } from "react-router-dom";
import MenuLeft from '../../components/menu left';
import TopBar from '../../components/top bar';

import Routes from "../../routes/routes";
import "./loggedLayout.scss";

export default function LoggedLayout(props) {
    const {user} = props

    return (
    <Router>
        <Grid className="logged-layout">
            <Grid.Row>
                <Grid.Column width={3}>
                    <MenuLeft user={user}/>
                </Grid.Column>
                <Grid.Column className= "content" width={13}>
                    <TopBar user= {user} />
                    <Routes></Routes>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={16}>
                    <h2>Player</h2>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Router>
    )
}

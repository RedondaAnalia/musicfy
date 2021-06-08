import React, {useState, useEffect} from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import {map} from 'lodash';
import { Link } from 'react-router-dom';

import firebase from '../../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';

import './albums.scss';

const db= firebase.firestore(firebase);

export default function Albums() {

    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        db.collection("albums")
            .get()
            .then(res => {
                const arrayAlbums = []
                map(res?.docs, album =>{
                    const data= album.data();
                    data.id= album.id;
                    arrayAlbums.push(data)
                });
                setAlbums(arrayAlbums);
            })
    }, [])


    return (
        <div className="albums">
            <h1>Álbums</h1>

            <Grid>
                {map(albums, album => (
                    <Grid.Column key={album.id} mobile={8} table={4} computer={3}>
                        <Album album={album}/>
                    </Grid.Column>
                )                    
                )}
            </Grid>
        </div>
    )
}

function Album(props) {
    const {album} = props;
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        firebase.storage()
                .ref( `album/${album.banner}`)
                .getDownloadURL()
                .then(url =>{
                    setImageUrl(url)
                })
    }, [album])

    return (
        <Link to={`/album/${album.id}`}>
            <div className="albums__item">
                <div className="avatar"
                    style= {{backgroundImage: `url('${imageUrl}')`}} 
                />
                <h3>{album.name}</h3>
            </div>
        </Link>
    );

}

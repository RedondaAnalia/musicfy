import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { map } from 'lodash';
import ListSongs from '../../components/songs/listSongs';
import { Loader } from 'semantic-ui-react';
import './album.scss';

import firebase from '../../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';

const db= firebase.firestore(firebase);


function Album(props) {

    const { match, playerSong } = props;
    const [album, setAlbum] = useState(null);
    const [albumImage, setAlbumImage] = useState(null);
    const [artist, setArtist] = useState(null);
    const [songs, setSongs] = useState([])

    useEffect(() => {
        db.collection("albums")
            .doc(match.params.id)
            .get()
            .then( res => {
                const data= res.data();
                data.id= res.id;
                setAlbum(data);
            })
    }, [match]);

    useEffect(() => {
        if(album){
            firebase.storage()
                    .ref(`album/${album?.banner}`)
                    .getDownloadURL()
                    .then(imageUrl => {
                        setAlbumImage(imageUrl)
                    }).catch( err => {
                        console.error(err)
                    })   
        }
    }, [album]);

    useEffect(() => {
        if(album){
            db.collection("artists")
                .doc(album?.artist)
                .get()
                .then( res => {
                    setArtist(res.data());
                })
        }
    }, [album]);

    useEffect(() => {
        if(album){
            db.collection("songs")
              .where("album", "==", album.id)
              .get()
              .then( res => {
                  const arraySongs=[];
                  map(res?.docs, song => {
                      const data= song.data();
                      data.id= song.id;
                      arraySongs.push(data);
                  })
                  setSongs(arraySongs);
              })

        }
        
    }, [album])

    if(!album || !artist){
        return (
            <Loader active>Cargando...</Loader>
        )
    }

    return (
      <div className="album">
          <div className="album__header">
              <HeaderAlbum album={album} albumImage={albumImage} artist={artist}/>
          </div>
          <div className="album__songs"> 
            <ListSongs songs={songs} albumImage={albumImage} playerSong={playerSong}/>
          </div>
      </div>
    )
}



export default withRouter(Album); 

function HeaderAlbum(props) {
    const {album, artist, albumImage} = props

    return (
        <>
            <div    className="image"
                    style={{backgroundImage: `url('${albumImage}')` }}
            />
            <div className="info">
                <h1>{album.name}</h1>
                <p>
                    De: <span>{artist.name}</span>
                </p>
            </div>
        </>

    )
}

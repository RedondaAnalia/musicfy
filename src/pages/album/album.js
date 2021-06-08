import React, {useState, useEffect} from 'react';
import { Loader } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import firebase from '../../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';
import './album.scss';
import artists from '../artists';

const db= firebase.firestore(firebase);

function Album(props) {

    const { match } = props;
    const [album, setAlbum] = useState(null);
    const [albumImage, setAlbumImage] = useState(null);
    const [artist, setArtist] = useState(null);

    useEffect(() => {
        db.collection("albums")
            .doc(match.params.id)
            .get()
            .then( res => {
                setAlbum(res.data());
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
            <p>Lista de Canciones...</p>
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

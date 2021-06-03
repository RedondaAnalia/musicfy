import React, {useState, useEffect} from 'react';
import BannerArtist from '../../components/artists/bannerArtist';
import { withRouter } from 'react-router-dom';

import firebase from '../../utils/firebase';
import 'firebase/firestore';

import './artist.scss';

const db = firebase.firestore(firebase);

function Artist(props) {
    const {match} = props;
    const [artist, setArtist] = useState(null);

    useEffect(() => {
        db.collection("artists")
          .doc(match?.params?.id)
          .get()
          .then(res => {
              setArtist(res.data())
          })
    }, [match])

    return (
        <div className="artist">
            {artist && (<BannerArtist artist={artist}/>)}
            <h2>Mas información...</h2>
        </div>
    )
}

export default withRouter(Artist);

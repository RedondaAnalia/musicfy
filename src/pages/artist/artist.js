import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { map } from 'lodash';

import firebase from '../../utils/firebase';
import 'firebase/firestore';

import BannerArtist from '../../components/artists/bannerArtist';
import BasicSliderItems from '../../components/sliders/basicSliderItems';
import SongsSlider from '../../components/sliders/songsSlider';
import './artist.scss';

const db = firebase.firestore(firebase);

function Artist(props) {
    const {match, playerSong} = props;
   
    const [artist, setArtist] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [songs, setSongs] = useState([]);

    console.log(songs)

    useEffect(() => {
        db.collection("artists")
          .doc(match?.params?.id)
          .get()
          .then(res => {
              const data= res.data();
              data.id= res.id;
              setArtist(data);
          })
    }, [match])

    useEffect(() => {
        if(artist){
            db.collection("albums")
              .where("artist", "==", artist.id)
              .get()
              .then(res => {
                  const arrayAlbums= []
                  map(res?.docs, album =>{
                      const data= album.data();
                      data.id= album.id;
                      arrayAlbums.push(data);
                  });
                  setAlbums(arrayAlbums);
                  if(arrayAlbums.length > 1){
                      recuperarCanciones(arrayAlbums)
                  } else {
                    console.log("El array esta vacio")
                  }
              });
        }
    }, [artist])

    const recuperarCanciones = async (arrayAlbums) => {    
        const arraySongs = [];
        await Promise.all(
                map(arrayAlbums, async item =>{
                    console.log(item.id)
                    await db.collection("songs")
                            .where("album","==", item.id)
                            .get()
                            .then( res => {
                                map(res?.docs, song =>{
                                    const data= song.data()
                                    data.id= song.id;
                                    console.log(data);
                                    arraySongs.push(data);
                                })
                            })
                } )
            );
            setSongs(arraySongs);
        }

    return (
        <div className="artist">
            {artist && (<BannerArtist artist={artist}/>)}
            <div className="artist__content">
                
                <BasicSliderItems   title= "Álbums"
                                    data={albums}
                                    folderImage="album"
                                    urlName="album"
                />
                <SongsSlider title="Canciones"
                             data={songs}
                             playerSong={playerSong}
                />                
            </div>
        </div>
    )
}

export default withRouter(Artist);

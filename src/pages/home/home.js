import React, {useState, useEffect} from 'react';
import { map } from 'lodash';
import BannerHome from '../../components/bannerHome';
import BasicSliderItems from '../../components/sliders/basicSliderItems';
import SongsSlider from '../../components/sliders/songsSlider';
import firebase from '../../utils/firebase';
import 'firebase/firestore';

import './home.scss';

const db = firebase.firestore(firebase);

export default function Home(props) {

    const {playerSong} = props

    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        db.collection('artists')
          .get()
          .then( res => {
              const arrayArtists = [];
              map(res?.docs, artist => {
                  const data = artist.data();
                  data.id= artist.id;
                  arrayArtists.push(data);
              });
              setArtists(arrayArtists);
          })
    }, [])

    useEffect(() => {
        db.collection("albums")
            .get()
            .then( res => {
                const arrayAlbums = [];
                map(res?.docs, album => {
                    const data = album.data();
                    data.id = album.id;
                    arrayAlbums.push(data);
                });
                setAlbums(arrayAlbums);
            })
    }, [])

    useEffect(() => {
        db.collection("songs")
          .limit(10)
          .get()
          .then(res => {
            const arraySongs = [];
            map(res?.docs, song => {
                const data = song.data();
                data.id = song.id;
                arraySongs.push(data);
            });
            setSongs(arraySongs);
          })
    }, [])


    //TODO: refactor de folderImages por constantes.

    return (
        <>
            <BannerHome />
            <div className="home">
                <BasicSliderItems title= "Ultimos artistas" 
                                    data={artists} 
                                    folderImage="artist"
                                    urlName="artist"/>
                <BasicSliderItems title= "Ultimos álbums" 
                                    data={albums} 
                                    folderImage="album"
                                    urlName="album"/>
                <SongsSlider title="Ultimas canciones"
                             data={songs}
                             folderImage="song"
                             urlName="song"
                             playerSong={playerSong} />
                <h2>Mas...</h2>
            </div>
        </>
    )
}



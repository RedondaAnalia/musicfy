import React, {useState, useEffect} from 'react';
import { map } from 'lodash';
import BannerHome from '../../components/bannerHome';
import BasicSliderItems from '../../components/sliders/basicSliderItems';
import firebase from '../../utils/firebase';
import 'firebase/firestore';

import './home.scss';

const db = firebase.firestore(firebase);

export default function Home() {

    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);

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
                <h2>Mas...</h2>
            </div>
        </>
    )
}



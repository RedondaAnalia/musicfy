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
    useEffect(() => {
        db.collection('artists')
          .get()
          .then( res => {
              const arrayArtists = []
              map(res?.docs, artist => {
                  const data = artist.data();
                  data.id= artist.id;
                  arrayArtists.push(data);
              });
              setArtists(arrayArtists);
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
                <h2>Mas...</h2>
            </div>
        </>
    )
}



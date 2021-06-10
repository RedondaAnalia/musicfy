import React, {useState, useEffect} from 'react';
import Slider from 'react-slick';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {map, size} from 'lodash';
import firebase from '../../../utils/firebase'
import 'firebase/firestore';
import 'firebase/storage';
import './songsSlider.scss';


const db= firebase.firestore(firebase);


export default function SongsSlider(props) {
    const { title, data, playerSong } = props;

    const settings= {
        dots: false,
        infinity: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode:true,
        className:"songs-slider__list"

    };

    if(size (data) < 5){
        return null;
    }

    return (
        <div className="songs-slider">
            <h2>{title}</h2>
            <div>
                <Slider {...settings}>
                {map (data, item => (
                            <Song key={item.id} item={item} playerSong={playerSong}/>
                        ))}
                </Slider>

            </div>
        </div>
    )
}

function Song (props)  {
    const {item, key, playerSong} = props;
    const [albumInfo, setAlbumInfo] = useState(null);
    const [bannerAlbum, setBannerAlbum] = useState(null);


    useEffect(() => {
        db.collection("albums")
          .doc(item.album)
          .get()
          .then( res => {
                const album = res.data();
                album.id = res.id;
                setAlbumInfo(album);
                getImage(album);
          }).catch( () =>{

          })
    }, [item])

    const getImage = album => {
        firebase.storage()
                .ref(`album/${album.banner}`)
                .getDownloadURL()
                .then( res => {
                    setBannerAlbum(res);
                })
    }

    const onPlay = () => {
        playerSong(bannerAlbum, item.name, item.fileName);

    }

    return (
        <div className="songs-slider__list-song">
            <div className="avatar"
                 style= {{backgroundImage: `url(${bannerAlbum})`}}
                onClick={onPlay}
            >
                <Icon name="play circle outline" />
            </div>
                <Link to={`/album/${albumInfo?.id}`}>
                    <h3>{item.name}</h3>
                </Link>
            </div>
    )
    
}

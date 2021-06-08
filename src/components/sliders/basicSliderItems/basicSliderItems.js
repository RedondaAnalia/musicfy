import React, {useState, useEffect} from 'react';
import { map, size } from 'lodash';
import  Slider  from 'react-slick';
import { Link } from 'react-router-dom';
import firebase from '../../../utils/firebase';
import "firebase/storage";

import "./basicSliderItems.scss";
import { Item } from 'semantic-ui-react';



export default function BasicSliderItems(props) {

    const {data, title, folderImage, urlName} = props;
    const settings= {
        dots: false,
        infinity: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: true,
        className: 'basic-slider-items__list'
    }

    if(size(data) < 5){
        return null
    }

    return (
        <div className="basic-slider-items">
            <h2>{title}</h2>
            <div>
                <Slider {...settings}>
                    {map (data, artist => (
                        <RenderItem key={artist.id} item={artist} folderImage={folderImage} urlName={urlName}/>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

function RenderItem(props){

    const { item, folderImage, urlName } = props
    const [imageUrl, setImageUrl] = useState(null);
    
    useEffect(() => {
        firebase.storage()
                .ref(`${folderImage}/${item.banner}`)
                .getDownloadURL()
                .then( url => {
                    setImageUrl(url);
                })

    }, [item, folderImage])

    return (
        <Link to={`/${urlName}/${item.id}`} >
            <div className="basic-slider-items__list-item">
                <div className="avatar"
                     style={{backgroundImage: `url('${imageUrl}')`}} />
                <h3>{item.name}</h3>
            </div>
        </Link>
    )

}

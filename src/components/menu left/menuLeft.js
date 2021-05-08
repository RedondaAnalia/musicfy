import React, { useState, useEffect } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { isUserAdmin } from "../../utils/api";

import BasicModal from "../modal/basic modal";

import './menuLeft.scss';


function MenuLeft(props) {
    const { user, location } = props;

    const [activeMenu, setActiveMenu] = useState(location.pathname);
    const [userAdmin, setUserAdmin] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);

    useEffect(() => {
        setActiveMenu(location.pathname);
    }, [location]);


    useEffect(() => {
                isUserAdmin(user.uid).then ( res => {
                                            setUserAdmin(res);
     })
    }, [userAdmin]);

    const handlerMenu = (e,menu) => {
        setActiveMenu(menu.to);
    }

    const handlerModal = type => {
        switch (type) {
            case "artist":
                setTitleModal("Nuevo Artista");
                setContentModal(<h2>Formulario Nuevo Artista</h2>);
                setShowModal(true);
                break;
            case "song":
                setTitleModal("Nueva Cancion");
                setContentModal(<h2>Formulario Nueva Cancion</h2>);
                setShowModal(true);
                break;
            default:
                setTitleModal(null);
                setShowModal(false);
                setContentModal(null);
                break;
        }       
    }

    return (
        <>
        <Menu className="menu-left" vertical>
            <div className="top">
            
                <Menu.Item  as={ Link } 
                            to="/" 
                            name="home" 
                            active={activeMenu === "/"} 
                            onClick={handlerMenu}>
                    
                    <Icon name="home" /> Inicio
                </Menu.Item>
                
                <Menu.Item  as={ Link } 
                            to="/artists" 
                            name="artists" 
                            active={ activeMenu === "/artists"} 
                            onClick={handlerMenu}>
                    
                    <Icon name="music" /> Artistas
                </Menu.Item>
            </div>

            {userAdmin && (
                <div className="footer" >
                    <Menu.Item onClick={()=> handlerModal("artist")}>
                        <Icon name="plus square outline" /> Nuevo Artista
                    </Menu.Item>
                    <Menu.Item onClick={()=> handlerModal("song")}>
                        <Icon name="plus square outline" /> Nueva Cancion
                    </Menu.Item>
                </div>
            )}        
        </Menu>
        <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
            {contentModal}
        </BasicModal>
        </>
    )
}

export default withRouter(MenuLeft);
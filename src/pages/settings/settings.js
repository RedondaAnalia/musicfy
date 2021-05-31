import React, {useState} from 'react';
import UploadAvatar from '../../components/settings/uploadAvatar';
import UserName from '../../components/settings/userName';
import BasicModal from '../../components/modal/basic modal';
import UserEmail from '../../components/settings/userEmail';
import UserPassword from '../../components/settings/userPassword';

import'./settings.scss';

export default function Settings(props) {
    const{user,setReloadApp}= props;
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [contentModal, setContentModal] = useState(null);
    return (
        <div className="settings">
            <h1>Configuración</h1>
            <div className="avatar-name">
                <UploadAvatar setReloadApp={setReloadApp} user= {user}/>
                <UserName   user={user} 
                            setShowModal={setShowModal} 
                            setTitleModal={setTitleModal} 
                            setContentModal={setContentModal}
                            setReloadApp={setReloadApp}
                />
            </div>
            <UserEmail  user={user} 
                        setShowModal={setShowModal} 
                        setTitleModal={setTitleModal} 
                        setContentModal= {setContentModal} />
            <UserPassword setShowModal={setShowModal} 
                        setTitleModal={setTitleModal} 
                        setContentModal= {setContentModal} />
            <BasicModal show={showModal} 
                        setShow={setShowModal} 
                        title={titleModal}>
                {contentModal}
            </BasicModal>

        </div>
    )
}

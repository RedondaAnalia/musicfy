import React from 'react';
import { Modal, Icon } from 'semantic-ui-react';

import "./basicModal.scss";


export default function BasicModal(props) {

    const { show, setShow, title, children } = props
    console.log("Contenido de show:" + show)

    const onClose= () => {
        setShow(false);
    }

    return (
        <Modal open={show} onClose={setShow} className="basic-modal" size="tiny">
            <Modal.Header>
                <h3>{title}</h3>
                <Icon name="close" onClick={onClose} />
            </Modal.Header>
            <Modal.Content>
                {children}
            </Modal.Content>
        </Modal>
    )
}

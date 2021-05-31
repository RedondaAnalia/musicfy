import React, {useState} from 'react';
import { Button, Form, Input, Icon } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import firebase from '../../utils/firebase';
import 'firebase/auth';

import { reauthenticate } from '../../utils/api';
import alertErrors from '../../utils/alertErrors';

export default function UserEmail(props) {
    const {user, setShowModal, setTitleModal, setContentModal} = props;

    const onEdit = () => {
        setTitleModal("Actualizar Email");
        setContentModal(<ChangeEmailForm email = {user.email} setShowModal={setShowModal} />);
        setShowModal(true);
    }

    return (
        <div className="user-email">
            <h3> Email: {user.email} </h3>
            <Button circular onClick={onEdit}>
                Actualizar
            </Button>
        </div>
    )
}



function ChangeEmailForm ( props ){

    const { email, setShowModal }= props;
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({email:"", password: ""});
    const [isLoading, setIsLoading] = useState(false);
    

    //TODO: Refactor... then-catch hell!!!
    const onSubmit= () =>{
        if(!formData.email){
            toast.warning("El email es el mismo");
        } else {
            setIsLoading(true);
            reauthenticate(formData.password).then( () => {
                const currentUser = firebase.auth().currentUser;
                currentUser.updateEmail(formData.email)
                            .then (() => {
                                toast.success("Email actualizado");
                                setShowModal(false);
                                currentUser.sendEmailVerification().then( () => {
                                    firebase.auth().signOut();
                                })
                            }).catch( error => {
                                alertErrors(error?.code);
                            }).finally( () =>{
                                setIsLoading(false);
                            })
            }).catch( error => {
                alertErrors(error?.code);
                setIsLoading(false)
            })
        }
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Field>
                <Input  defaultValue={email}
                        type="text" 
                        onChange={ e => { setFormData ({...formData, email: e.target.value})} }
                />
            </Form.Field>
            <Form.Field>
                <Input  placeholder="Contraseña"
                        type={showPassword ? "text" : "password"}
                        icon={<Icon name={showPassword ? "eye slash outline" : "eye"} 
                                    link
                                    onClick={() => setShowPassword(!showPassword)} />}
                        onChange={ e => { setFormData ({...formData, password: e.target.value})} }
                />
            </Form.Field>
            <Button type="submit" loading={isLoading}>
                Actualizar contraseña
            </Button>
        </Form>
    );
}

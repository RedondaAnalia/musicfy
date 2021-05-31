import React, {useState} from 'react';
import { toast } from 'react-toastify';
import { Button, Form, Input, Icon } from 'semantic-ui-react';
import { reauthenticate } from '../../utils/api';
import alertErrors from '../../utils/alertErrors';
import firebase from '../../utils/firebase';
import 'firebase/auth';

export default function UserPassword(props) {

    const { setShowModal, setContentModal, setTitleModal} = props;

    const onEdit= () => {
        setTitleModal("Actualizar Contraseña");
        setContentModal(<ChangePasswordForm setShowModal={setShowModal}/>);
        setShowModal(true);
    }
    return (
        <div className="user-password">
            <h3>Contraseña: *** *** *** *** </h3>
            <Button circular onClick={onEdit}>Actualizar</Button>
        </div>
    )
}

function ChangePasswordForm (props) {
    const {setShowModal} = props
    const [formData, setFormData] = useState({
        currentPassword:"",
        newPassword: "",
        repeatNewPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = () => {
        if(formData.currentPassword && formData.newPassword && formData.repeatNewPassword &&
            formData.newPassword === formData.repeatNewPassword &&
            formData.currentPassword !== formData.newPassword &&
            formData.newPassword.length >= 6){
            setIsLoading(true);
            reauthenticate(formData.currentPassword)
              .then( () => {
                const currentUser = firebase.auth().currentUser;
                currentUser.updatePassword(formData.newPassword)
                            .then( () => {
                                toast.success("Contraseña actualizada exitosamente");
                                setShowModal(false);
                            }).catch ( err => {
                                alertErrors(err?.code);
                                setIsLoading(false);
                            })

            }).catch ( err => {
                alertErrors(err?.code)
            }).finally ( () =>{
                setIsLoading(false)
            })
        } else {
            handlerErrorPassword()
        }
    }

    const handlerErrorPassword = ()  =>{
        if (!formData.currentPassword || !formData.newPassword || !formData.repeatNewPassword){
            toast.warning("Las contraseñas no pueden estar vacías");
            return;
        }
        if (formData.currentPassword === formData.newPassword) {
            toast.warning("La nueva contraseña no puede ser igual a la actual");
            return;
        }
        if(formData.newPassword !== formData.repeatNewPassword){
            toast.warning("La confirmacion de contraseña no coincide con la nueva contraseña")
        }
        if(formData.newPassword.length < 6){
            toast.warning("La contraseña debe contener al menos 6 caracteres")
        }

    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Field>
                <Form.Input placeholder="Contraseña actual"
                            type={showPassword ? "text" : "password"}
                            onChange={e=> setFormData({...formData,currentPassword:e.target.value})}
                            icon={
                            <Icon   name={showPassword ? "eye slash outline" : "eye"}
                                    onClick={ () => setShowPassword(!showPassword)}
                                    link />}>
                </Form.Input>
            </Form.Field>
            <Form.Field>
                <Form.Input placeholder="Nueva contraseña"
                            type={showPassword ? "text" : "password"}
                            onChange={e=> setFormData({...formData,newPassword:e.target.value})}
                            icon={
                                <Icon   name={showPassword ? "eye slash outline" : "eye"}
                                        onClick={ () => setShowPassword(!showPassword)}
                                        link />}>
                </Form.Input>
            </Form.Field>
            <Form.Field>
                <Form.Input placeholder="Repetir nueva contraseña"
                            type={showPassword ? "text" : "password"}
                            onChange={e=> setFormData({...formData,repeatNewPassword:e.target.value})}
                            icon={
                                <Icon   name={showPassword ? "eye slash outline" : "eye"}
                                        onClick={ () => setShowPassword(!showPassword)}
                                        link />}>
                </Form.Input>
            </Form.Field>
            <Button type="submit" loading={isLoading}>
                Cambiar contraseña
            </Button>
        </Form>
    )
}

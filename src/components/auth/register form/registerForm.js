import React, {useState} from 'react';
import { Button, Icon, Form, Input} from "semantic-ui-react";
import { toast, Toast } from "react-toastify";
import firebase from "../../../utils/firebase";
import {validateEmail} from "../../../utils/validations";
import "firebase/auth";
import "./registerForm.scss"


export default function RegisterForm(props) {

    const {setSelectedForm} = props;
    const [formData, setFormData] = useState(defaultValueForm());
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handlerShowPassword= () => {
        setShowPassword (!showPassword);
    }
    const onChange = e=> {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const onSubmit = () => {
        setFormError({});
        let error={};
        let formOk = true;


        //TODO: refactor.
        if(!validateEmail(formData.email)){
            error.email =true;
            formOk=false;
        }

        if(formData.password.lenght < 6){
            error.password = true;
            formOk = false
        }

        if(!formData.username){
            error.username = true;
            formOk = false
        }

        setFormError(error);
        
        if(formOk){
            setIsLoading(true);
            firebase.auth()
                    .createUserWithEmailAndPassword(formData.email, formData.password)
                    .then( () => {
                        changeUserName();
                        //TODO: configurar mail automático (llega genérico).
                        sendVerificationEmail();
                    })
                    .catch(err=>{
                        console.log(err);
                        handlerErrors (err.code, setSelectedForm);
                    })
                    .finally(()=>{
                        setIsLoading(false);
                        setSelectedForm(null);
                    })
        }
        
    }
    
    const changeUserName = () => {
        firebase.auth().currentUser.updateProfile({
            displayName: formData.username
        }).catch ( () =>{
            toast.error("Error al asignar el nombre de usuario.")
        })
    }

    const sendVerificationEmail = () =>{
        firebase.auth().currentUser.sendEmailVerification().then(()=>{
            toast.success("Se ha enviado un email de verificación")
        }).catch(()=>{
            toast.error("Error al enviar el mail de verificación");
        })
    }

    return (
        <div className="register-form">
            <h1>Empieza a escuchar con una cuenta de Musicfy gratis</h1>
            <Form onSubmit= {()=>onSubmit()}
                  onChange={onChange}
            >
                <Form.Field>
                    <Input
                        type="text"
                        name="email"
                        placeholder="Correo electronico"
                        icon="mail outline"
                        error= {formError.email}
                    />
                    {formError.email && (
                        <span className="error-text">
                            Por favor, introduce un correo electrónico válido
                        </span>
                    )}
                </Form.Field>
                <Form.Field>
                    <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Contraseña"
                        icon={showPassword ? (
                            <Icon name="eye slash outline" link onClick={handlerShowPassword}/>
                        ) : (
                            <Icon name="eye" link onClick={handlerShowPassword}/>
                        )}
                        error= {formError.password}
                    />
                    {formError.password && (
                        <span className="error-text">
                            Por favor, introduce un password de 6 o más caracteres
                        </span>
                    )}
                </Form.Field>
                <Form.Field>
                    <Input
                        type="text"
                        name="username"
                        placeholder="Como deberiamos llamarte"
                        icon="user circle outline"
                        error= {formError.username}
                    />
                    {formError.username && (
                        <span className="error-text">
                            Por favor, introduce un username
                        </span>
                    )}
                </Form.Field>
                <Button type="submit" loading={isLoading}> Continuar</Button>
            </Form>

            <div className="register-form__options">
                <p onClick={()=> setSelectedForm(null)}>Volver</p>
                <p>Ya tienes Musicfy? 
                    <span onClick={()=> setSelectedForm("login")}>Iniciar sesion</span>         
                </p>
            </div>
            
        </div>
    )
}

function defaultValueForm() {
    return{
        email: "",
        password: "",
        username:""
}
}

function handlerErrors(code, setSelectedForm){
    switch(code){
        case "auth/email-already-in-use":
            toast.warning("Parece que ya tienes una cuenta en Musicfy");
            setSelectedForm("login");
            break;
        default:
            break;
    }
}

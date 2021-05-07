import React, {useState} from 'react';
import { Button, Icon, Form, Input } from "semantic-ui-react";
import { toast, Toast } from "react-toastify";
import { validateEmail } from "../../../utils/validations";
import firebase from "../../../utils/firebase";
import "firebase/auth";

import "./loginForm.scss";


//TODO: recuperación de contraseña.
export default function LoginForm(props) {

    const { setSelectedForm } = props;

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultValueForm());
    const [formError, setFormError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userActive, setUserActive] = useState(true);
    const [user, setUser] = useState(false);

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
        let errors={};
        let formOk = true;

        if(!validateEmail(formData.email)){
            errors.email= true;
            formOk= false;
        }
        
        //TODO: validacion repetidas en register... Refactor!
        if(formData.password.length <6){
            errors.password = true;
            formOk= false;
        }

        setFormError(errors);

        if(formOk){
            setIsLoading(true);
            firebase.auth()
                    .signInWithEmailAndPassword(formData.email, formData.password)
                    .then( res =>{
                        console.log(res);
                        setUser(res.user);
                        setUserActive(res.user.emailVerified);
                        if(!res.user.emailVerified){
                            toast.warning (" Ups! Parece que tu email no está verificado. Por favor, revisa tu correo y verifica tu email.")
                        }
                    }).catch(err => {
                        console.log(err)
                        handlerErrors(err.code)
                    }).finally( ()=> {
                        setIsLoading(false);
                    })
        }
    }

    return (
        <div className="login-form">
            <h1>Música para todos</h1>

            <Form onSubmit={onSubmit} onChange={onChange}>
                <Form.Field>
                    <Input  type="text"
                            name="email"
                            placeholder="Correo electrónico"
                            icon="mail outline"
                            error={formError.email}
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
                            Por favor, introduce tu password de 6 o más caracteres
                        </span>
                    )}
                    <Button type="submit" loading={isLoading}>Iniciar Sesión</Button>
                </Form.Field>

                {!userActive && (
                    <ButtonResetSendEmailVerification
                        user={user}
                        setIsLoading= {setIsLoading}
                        setUserActive={setUserActive}
                    />
                 )}

                <div className="login-form__options">
                    <p onClick={()=> setSelectedForm(null)}>Volver</p>
                    <p>
                        ¿No tienes cuenta?{" "}
                        <span onClick={()=> setSelectedForm("register")}>Registrar</span>
                    </p>
                </div>


            </Form>

           
        </div>
    )
}


function ButtonResetSendEmailVerification(props){
    const { user, setIsLoading, setUserActive} = props;

    const resendVerificationEmail= () => {
        user.sendEmailVerification().then (() => {
            toast.success("Se ha enviado el mail de verificacion")
        }).catch(err=> {
            console.log(err);
            handlerErrors(err.code);
        }).finally( () =>{
            setIsLoading(false);
            setUserActive(true);
        })
    }

    return(
        <div className="resend-verification-email">
            <p>
                Si no has recibido el email de verificación puedes volver a enviarlo haciendo click {" "} 
                <span onClick={resendVerificationEmail}> 
                    aquí
                </span>
            </p>
        </div>
    )
}


function handlerErrors(code){
    switch(code){
        case "auth/user-not-found":
        case "auth/wrong-password":
            toast.warning("El usuario o la contraseña son incorrectos");
            break;
        case "auth/too-many-request":
            toast.warning("Has enviado demasiadas solicitudes de reenvio de email de confirmación en muy poco tiempo. Por favor, intenta en unos instantes.");
            break;
        default:
            break;
    }
}
function defaultValueForm() {
    return{
        password: "",
        username: ""
}
}
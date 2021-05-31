import { toast } from 'react-toastify';

export default function alertErrors (type) {
    switch (type) {
        case 'auth/wrong-password':
            toast.warning(" La contraseña no es correcta");            
            break;

        case 'auth/email-already-in-use':
            toast.warning("El nuevo email ya está en uso")
            break;
    
        default:
            toast.warning("Error del servidor. Intentelo más tarde");
            break;
    }
}
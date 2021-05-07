import React, {useState} from 'react';
import firebase from "./utils/firebase";
import "firebase/auth";
import Auth from "./pages/auth";
import { ToastContainer } from "react-toastify"


function App() {

  const [user, setUser] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  firebase.auth().onAuthStateChanged(currentUser => {
    console.log(currentUser);
        if(!currentUser?.emailVerified) {
          firebase.auth().signOut();
          setUser(null);
        } else {
          setUser(currentUser);
        }
        setIsLoading(false);


  });

  if(isLoading){
    return null;
  }

  return (
    <>
      {!user ? <Auth /> : <UserLogged/>}
      <ToastContainer 
            position="top-center"
            autoClose={1000000000000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
      />
    </>
  )
}

function UserLogged(){

  const logOut = () => {
    firebase.auth().signOut();
  }

  return(
    <div style={{ display: "flex", 
                  alignItems:"center",
                  justifyContent: "center",
                  flexDirection: "column",
                  height:"100vh"
                }}
    >
      <h1>Usuario Logueado</h1>
      <button onClick={logOut}>Cerrar Sesión</button>
    </div>
  )
}

export default App;

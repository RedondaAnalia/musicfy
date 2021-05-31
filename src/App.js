import React, {useState} from 'react';
import firebase from "./utils/firebase";
import "firebase/auth";
import Auth from "./pages/auth";
import { ToastContainer } from "react-toastify";
import LoggedLayout from "./layouts/loggedLayout";


function App() {

  const [user, setUser] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadApp, setReloadApp] = useState(false);

  firebase.auth().onAuthStateChanged(currentUser => {
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
      {!user ? <Auth /> : <LoggedLayout user= {user} setReloadApp={setReloadApp}/>}
      <ToastContainer 
            position="top-center"
            autoClose={5000}
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

export default App;

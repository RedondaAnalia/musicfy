import React from 'react';
import firebase from "./utils/firebase";
import "firebase/auth";


function App() {

  firebase.auth().onAuthStateChanged(currentUser => {
    console.log(currentUser ? "Estamos logueados" : "No estamos logueados");
  });

  return (
    <div>
      <h1>App Electron + React</h1>
      
    </div>
  );
}

export default App;

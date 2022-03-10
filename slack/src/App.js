import React, {useState} from 'react';
import './App.css';
import Header from './components/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./components/Sidebar"; 
import Login from './components/Login';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from "./firebase";
import {firebase} from "./firebase.js";


function App() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(auth);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      return setIsUserSignedIn(true);
    }
    setIsUserSignedIn(false);
  })
 if (isUserSignedIn === true) {
   return (
    <>
     <Header/>
     <AppBody>
       <Sidebar/>
     <Router>
       <Switch> 
         <Route path="/" exact>
           </Route>
       </Switch>
       </Router>
       </AppBody>
       
     
     </>
   );
  
}
 else {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Login}/>
      </Switch>
    </Router>
  ) ;
 }

}

export default App;


const AppBody = styled.div`
  display: flex;
  height: 100vh;

`; 

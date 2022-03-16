import React from 'react';
import { SideBar } from "./components/SideBar/SideBar.component";
import Messages from "./components/Messages/Message.component";

import './App.css';
import { Grid } from 'semantic-ui-react';
import Auth from './components/Auth/Login.component'

function App() {
  return (
    <Grid columns="equal">
      
      <SideBar />
      <Grid.Column className="messagepanel">
        <Messages />
      </Grid.Column>

      <Grid.Column width={1}>
        <span>

        </span>
      </Grid.Column>
    </Grid>

  );
}

export default App;
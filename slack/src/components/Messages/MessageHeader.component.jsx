import React from 'react';
import { Segment, Header, Input, Icon } from 'semantic-ui-react';
import './Messages.css';
import {firebaseConfig, getDatabase}from 'firebase';


const MessageHeader = (props) => {
    const removeChannel =() => {
        // ref = Constants.Client+"/"+Constants.firebaseProjects+"/"+Constants.ProjectName+"konnekt";
        var ref = getDatabase(firebaseConfig()).ref('pubchannels').child("My8KuAeDL6HtgddtxWG");
        console.log(ref);
        ref.child("pubchannels").child("My8KuAeDL6HtgddtxWG").removeValue();
    }
    return (

   <Segment clearing>
        
        <Header floated="left" fluid="true" as="h2">
            <span >
                {(props.isPrivateChat ? "@ " : "# ") + props.channelName}
                {!props.isPrivateChat && <Icon
                    onClick={props.starChange}
                    name={props.starred ? "star" : "star outline"}
                    color={props.starred ? "yellow" : "black"} />
                    }
                   
            </span>
            <Header.Subheader> {props.uniqueUsers} User{props.uniqueUsers === 1 ? "" : "s"}</Header.Subheader>
        </Header>
        <Header floated="right">
            <Input
                name="search"
                icon="search"
                placeholder="Search Messages"
                size="mini"
                onChange={props.searchTermChange}
            />
        </Header>

    </Segment>
  
   
    )
}

export default MessageHeader;
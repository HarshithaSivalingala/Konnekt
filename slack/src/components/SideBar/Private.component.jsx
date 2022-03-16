import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import firebase from "firebase";
import { setChannel} from "../../store/actioncreator";
import { Notification } from "./Notification.component";

import './Channels.css';
import { Menu, Icon, Modal, Form} from 'semantic-ui-react';

const Private  = (props) => {
    const [prichannelsState, setpriChannelsState] = useState([]);
    const [modalopen1, setModalOpen1] = useState(false);
    const [modalOpenState1, setModalOpenState1] = useState(false);
    const [privateOpen,privateSet] = useState(false);
    const [modalopen, setModalOpen] = useState(false);
    const [channelAddState, setChannelAddState] = useState({ name: '', description: '', password: ''});
    const [isLoadingState, setLoadingState] = useState(false);
    


    const channels = firebase.database().ref("prichannels");
    const users = firebase.database().ref("users");

    useEffect(() => {
        channels.on('child_added', (snapshot) => {
            setpriChannelsState((currentState) => {
                let updatedState = [...currentState];
                updatedState.push(snapshot.val());               
                return updatedState;
            })
        });

        return () => channels.off();
    }, [])

    useEffect(()=> {
        if (prichannelsState.length > 0) {
            props.selectChannel(prichannelsState[0])
        }
    },[!props.channel ?prichannelsState : null ])







    const displayChannels = () => {
        if (prichannelsState.length > 0) {
            return prichannelsState.map((channel) => {
                return <Menu.Item
                    key={channel.id}
                    name={channel.name}
                    onClick={() => selectChannel1(channel)}
                    active={props.channel && channel.id === props.channel.id && !props.channel.isFavourite}
                >
                      <Notification user={props.user} channel={props.channel}
                        notificationChannelId={channel.id}
                        displayName= {"# " + channel.name} />
                   
                </Menu.Item>
            })
        }
    }
    const closeModalPrivate = () => {
        setModalOpenState1(false);
          
    }
    const checkIfFormValid = () => {
        return channelAddState && channelAddState.name && channelAddState.description && channelAddState.password;
    }
  

  
    const selectChannel1 = (channel) => {
         var pwd = window.prompt("Enter the Room Code");
        

        if (pwd === channel.password) {
            setLastVisited1(props.user,props.channel);
            setLastVisited1(props.user,channel);
            props.selectChannel(channel);
        
        }
        else if ((pwd !== channel.password) && (pwd != null) ){
            alert("Wrong Password")
        }


    }
     const onSubmit1 = () => {
        setModalOpen1(false);
        privateSet(false);
        setModalOpen(false);

        

        if (!checkIfFormValid()) {
            return;
        }

        const key = channels.push().key;

        const channel = {
            id: key,
            name: channelAddState.name,
            description: channelAddState.description,
            password: channelAddState.password,
            created_by: {
                name: props.user.displayName,
                avatar: props.user.photoURL
            }
        }
        console.log(channel.password)

        setLoadingState(true);
        channels.child(key)
            .update(channel)
            .then(() => {
                setChannelAddState({ name: '', description: '' , password: ''});
                setLoadingState(false);
                closeModalPrivate();
            })
            .catch((err) => {
                console.log(err);
            })
    }


    
    

    const setLastVisited1 = (user, channel) => {
        const lastVisited = users.child(user.uid).child("lastVisited").child(channel.id);
        lastVisited.set(firebase.database.ServerValue.TIMESTAMP);
        lastVisited.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
    }

    

    return <> <Menu.Menu style={{ marginTop: '35px' }}>
  
        <Menu.Item style={{fontSize : '17px'}}>
            <span className="clickable">
                <p> <Icon name="user secret" />  Private </p>
            </span>
            <tb/>({prichannelsState.length})
        </Menu.Item>
        {displayChannels()}
    
    </Menu.Menu>
        
        
    </>
}

const mapStateToProps = (state) => {
    return {
        user: state.user.currentUser,
        channel: state.channel.currentChannel
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectChannel: (channel) => dispatch(setChannel(channel))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Private);
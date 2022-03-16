import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import firebase from "firebase";
import { setChannel} from "../../store/actioncreator";
import { Notification } from "./Notification.component";
import onSubmit1 from "./Private.component";
import './Channels.css';
import { Menu, Icon, Modal, Button, Form, Segment, TransitionablePortal, event} from 'semantic-ui-react';
import {Public} from '@material-ui/icons'

const Channels = (props) => {
    const [modalOpenState, setModalOpenState] = useState(false);
    const [modalOpenState1, setModalOpenState1] = useState(false);
    const [modalopen1, setModalOpen1] = useState(false);
    const [modalopen, setModalOpen] = useState(false);
    const [channelAddState, setChannelAddState] = useState({ name: '', description: '', password: ''});
    const [isLoadingState, setLoadingState] = useState(false);
    const [pubchannelsState, setpubChannelsState] = useState([]);
    const [privateOpen,privateSet] = useState(false);
    const [prichannelsState, setpriChannelsState] = useState([]);

    

    const channelsRef = firebase.database().ref("pubchannels");
    const usersRef = firebase.database().ref("users");

    const channels = firebase.database().ref("prichannels");
    const users = firebase.database().ref("users");


    useEffect(() => {
        channelsRef.on('child_added', (snap) => {
            setpubChannelsState((currentState) => {
                let updatedState = [...currentState];
                updatedState.push(snap.val());               
                return updatedState;
            })
        });

        return () => channelsRef.off();
    }, [])

    useEffect(()=> {
        if (pubchannelsState.length > 0) {
            props.selectChannel(pubchannelsState[0])
        }
    },[!props.channel ?pubchannelsState : null ])

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

    const openModalPrivate = () => {
        setModalOpenState1(true);
    }

    const closeModalPrivate = () => {
        setModalOpenState1(false);
          
    }

    const openModal = () => {
        setModalOpenState(true);
    }
    const openModal2 = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpenState(false);
    }
    const closeModal2 = () => {
        setModalOpen(false);
    }

    const checkIfFormValid = () => {
        return channelAddState && channelAddState.name && channelAddState.description && channelAddState.password;
    }

    const displayChannels = () => {
        if (pubchannelsState.length > 0) {
            return pubchannelsState.map((channel) => {
                return <Menu.Item
                    key={channel.id}
                    name={channel.name}
                    onClick={() => selectChannel(channel)}
                    active={props.channel && channel.id === props.channel.id && !props.channel.isFavourite}
                >
                      <Notification user={props.user} channel={props.channel}
                        notificationChannelId={channel.id}
                        displayName= {"# " + channel.name} />
                   
                </Menu.Item>
            })
        }
 
        }
    

    const selectChannel = (channel) => {
        setLastVisited(props.user,props.channel);
        setLastVisited(props.user,channel);
        props.selectChannel(channel);
    }

    const setLastVisited = (user, channel) => {
        const lastVisited = usersRef.child(user.uid).child("lastVisited").child(channel.id);
        lastVisited.set(firebase.database.ServerValue.TIMESTAMP);
        lastVisited.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
    }

   
 

    const onSubmit = () => {
        setModalOpen(false);
        privateSet(false);
        
       

        if (!checkIfFormValid()) {
            return false;
        }

        const key = channelsRef.push().key;

        const channel = {
            id: key,
            name: channelAddState.name,
            description: channelAddState.description,
            created_by: {
                name: props.user.displayName,
                avatar: props.user.photoURL
            }
        }
        setLoadingState(true);
        channelsRef.child(key)
            .update(channel)
            .then(() => {
                setChannelAddState({ name: '', description: '' });
                setLoadingState(false);
                closeModal();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    

    const handleInput = (e) => {

        let target = e.target;
        setChannelAddState((currentState) => {
            let updatedState = { ...currentState };
            updatedState[target.name] = target.value;
            return updatedState;
        })
    }

    return (
    <>
    {' '}
    
    <Menu.Menu style={{ marginTop: '35px' }}>
        <Menu.Item>
            <span className="clickable mains" onClick={openModal2} >
                <p><Icon name="add" />ADD CHANNEL</p>
            </span>
        </Menu.Item>
        <selectChannel1/>
        <br></br>  
        <Menu.Item style={{fontSize : '17px'}}>
            <span className="mains">
              <Public fontsize='large'/>
                <span> Public({pubchannelsState.length})</span>{' '}
            </span>
        </Menu.Item>
        {displayChannels()}
        <Menu.Item>
        <TransitionablePortal
          open={modalopen}
          onOpen={() => setTimeout(() => document.body.classList.add('modal-fade-in'), 0)}
          transition={{ animation: 'scale', duration: 500 }}
        >
        <Modal size={'tiny'}open={modalopen} onOpen={() => setTimeout(() => document.body.classList.add('modal-fade-in'), 0)}
          transition={{ animation: 'scale', duration: 500}} 
          onClose={() => setTimeout(() => document.body.classList.add('modal-fade-in'), 0)} close={closeModal}>
            <Modal.Header>
                Choose a new Workspace 
            </Modal.Header>
            
            <Modal.Actions>
                <Button color = "facebook" style={{float: 'left'}} loading={isLoadingState} onClick={openModal} >
                    <Icon name="bullhorn" /> Public 
                </Button>
                <Button color = "red" loading={isLoadingState} onClick={closeModal2}>
                    Close
                </Button>
                <Button color = "facebook" style={{float: 'left'}} loading={isLoadingState} onClick={openModalPrivate}>
                        <Icon name="user secret" /> Private  
                </Button>
            </Modal.Actions>
            
        </Modal>
        </TransitionablePortal>
        
        </Menu.Item>
        
    </Menu.Menu>
    <TransitionablePortal
          open={modalOpenState1}
          onOpen={() => setTimeout(() => document.body.classList.add('modal-fade-in'), 0)}
          transition={{ animation: 'scale', duration: 500 }}
        >
    
    <Modal open={modalOpenState1} onClose={closeModalPrivate}>
            <Modal.Header>
                Create Private Channel
            </Modal.Header>
            <Modal.Content>
                <Form onSubmit={onSubmit}>
                    <Segment stacked>
                        <Form.Input
                            name="name"
                            value={channelAddState.name}
                            onChange={handleInput}
                            type="text"
                            placeholder="Enter Channel Name"
                        />
                        <Form.Input
                            name="description"
                            value={channelAddState.description}
                            onChange={handleInput}
                            type="text"
                            placeholder="User ID"
                        />
                        <Form.Input
                            name="password"
                            value={channelAddState.password}
                            onChange={handleInput}
                            type="password"
                            placeholder="Room Code"
                        />
                        <Form.Input
                            name="confirmpassword"
                            value={channelAddState.confirmpassword}
                            onChange={handleInput}
                            type="password"
                            placeholder="Confirm Room Code"
                        />
                    </Segment>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color = "green" loading={isLoadingState} onClick={onSubmit1} >
                    <Icon name="checkmark" /> Save
                </Button>
                <Button color="red" onClick={closeModalPrivate}>
                    <Icon name="remove" /> Cancel
                </Button>
            </Modal.Actions>
            
        </Modal>
        </TransitionablePortal>
        
        <TransitionablePortal
          open={modalOpenState}
          onOpen={() => setTimeout(() => document.body.classList.add('modal-fade-in'), 0)}
          transition={{ animation: 'scale', duration: 500 }}
        >
        <Modal open={modalOpenState} onClose={closeModal}>
            <Modal.Header>
                Create Public Channel
            </Modal.Header>
            <Modal.Content>
                <Form onSubmit={onSubmit}>
                    <Segment stacked>
                        <Form.Input
                            name="name"
                            value={channelAddState.name}
                            onChange={handleInput}
                            type="text"
                            placeholder="Enter Channel Name"
                        />
                        <Form.Input
                            name="description"
                            value={channelAddState.description}
                            onChange={handleInput}
                            type="text"
                            placeholder="Enter Channel Description"
                        />
                    </Segment>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color = "green" loading={isLoadingState} onClick={onSubmit} positive>
                    <Icon name="checkmark" /> Save
                </Button>
                <Button color="red" onClick={closeModal}>
                    <Icon name="remove" /> Cancel
                </Button>
            </Modal.Actions>
           
        </Modal>
    
        </TransitionablePortal>
        
    </>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Channels);

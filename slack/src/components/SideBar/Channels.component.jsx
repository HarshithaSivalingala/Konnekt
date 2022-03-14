import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import firebase from "firebase";
import { setChannel} from "../../store/actioncreator";
import { Notification } from "./Notification.component";
import {Private} from "./Private.component";
import './Channels.css';
import { Menu, Icon, Modal, Button, Form, Segment} from 'semantic-ui-react';

const Channels = (props) => {
    const [modalOpenState, setModalOpenState] = useState(false);
    const [modalOpenState1, setModalOpenState1] = useState(false);
    const [modalopen1, setModalOpen1] = useState(false);
    const [modalopen, setModalOpen] = useState(false);
    const [channelAddState, setChannelAddState] = useState({ name: '', description: ''});
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
        return channelAddState && channelAddState.name && channelAddState.description;
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

    const setLastVisited1 = (user, channel) => {
        const lastVisited = users.child(user.uid).child("lastVisited").child(channel.id);
        lastVisited.set(firebase.database.ServerValue.TIMESTAMP);
        lastVisited.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
    }
    const selectChannel1 = (channel) => {
        // prompt("trial prompt")
        setLastVisited1(props.user,props.channel);
        setLastVisited1(props.user,channel);
        props.selectChannel(channel);
    }

    const onSubmit = () => {
        setModalOpen(false);
        privateSet(false);
        
       

        if (!checkIfFormValid()) {
            return;
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
            created_by: {
                name: props.user.displayName,
                avatar: props.user.photoURL
            }
        }
        setLoadingState(true);
        channels.child(key)
            .update(channel)
            .then(() => {
                setChannelAddState({ name: '', description: '' });
                setLoadingState(false);
                closeModalPrivate();
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

    return <> <Menu.Menu style={{ marginTop: '35px' }}>
        <Menu.Item>
            <span className="clickable" onClick={openModal2} >
                <Icon name="add" /> ADD CHANNEL
            </span>
        </Menu.Item>
        <br></br>  
        <Menu.Item style={{fontSize : '17px'}}>
            <span>
                <Icon name="bullhorn" />  Public
            </span>
            <tb/>({pubchannelsState.length})
        </Menu.Item>
        {displayChannels()}
        <Menu.Item>
        <Modal size={'tiny'}open={modalopen} onClose={closeModal}>
            <Modal.Header>
                Choose a new Workspace 
            </Modal.Header>
            
            <Modal.Actions>
                <Button style={{float: 'left'}} loading={isLoadingState} onClick={openModal}>
                    <Icon name="bullhorn" /> Public 
                </Button>
                <Button loading={isLoadingState} onClick={closeModal2}>
                    Close
                </Button>

                
                <Button style={{float: 'left'}} loading={isLoadingState} onClick={openModalPrivate}>
                    <Icon name="user secret" /> Private
                </Button>
            </Modal.Actions>
        </Modal>
        </Menu.Item>
    </Menu.Menu>
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
                            placeholder="User Id"
                        />
                        <Form.Input
                            name="password"
                            value={channelAddState.password}
                            onChange={handleInput}
                            type="password"
                            placeholder="User Password"
                        />
                        <Form.Input
                            name="confirmpassword"
                            value={channelAddState.confirmpassword}
                            onChange={handleInput}
                            type="password"
                            placeholder="Confirm Password"
                        />
                    </Segment>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button loading={isLoadingState} onClick={onSubmit1}>
                    <Icon name="checkmark" /> Save
                </Button>
                <Button onClick={closeModalPrivate}>
                    <Icon name="remove" /> Cancel
                </Button>
            </Modal.Actions>
        </Modal>
        
        <Modal open={modalOpenState} onClose={closeModal}>
            <Modal.Header>
                Create Channel
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
                <Button loading={isLoadingState} onClick={onSubmit}>
                    <Icon name="checkmark" /> Save
                </Button>
                <Button onClick={closeModal}>
                    <Icon name="remove" /> Cancel
                </Button>
            </Modal.Actions>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
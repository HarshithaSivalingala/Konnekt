import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { setChannel } from '../../store/actioncreator'
import { Notification } from './Notification.component'
import { LockOpen } from '@material-ui/icons'
import './Channels.css'
import { Menu, Icon, Modal, Form } from 'semantic-ui-react'

const Private = (props) => {
  const [prichannelsState, setpriChannelsState] = useState([])


  const channels = firebase.database().ref('prichannels')
  const users = firebase.database().ref('users')

  useEffect(() => {
    channels.on('child_added', (snapshot) => {
      setpriChannelsState((currentState) => {
        let updatedState = [...currentState]
        updatedState.push(snapshot.val())
        return updatedState
      })
    })

    return () => channels.off()
  }, [])

  useEffect(() => {
    if (prichannelsState.length > 0) {
      props.selectChannel(prichannelsState[0])
    }
  }, [!props.channel ? prichannelsState : null])

  const displayChannels = () => {
    if (prichannelsState.length > 0) {
      return prichannelsState.map((channel) => {
        return (
          <Menu.Item
            key={channel.id}
            name={channel.name}
            onClick={() => selectChannel1(channel)}
            active={
              props.channel &&
              channel.id === props.channel.id &&
              !props.channel.isFavourite
            }
          >
            <Notification
              user={props.user}
              channel={props.channel}
              notificationChannelId={channel.id}
              displayName={'# ' + channel.name}
            />
          </Menu.Item>
        )
      })
    }
  }

  const selectChannel1 = (channel) => {
    var pwd = window.prompt('Enter the Room Code')

    if (pwd === channel.password) {
      setLastVisited1(props.user, props.channel)
      setLastVisited1(props.user, channel)
      props.selectChannel(channel)
    } else if (pwd !== channel.password && pwd != null) {
      alert('Wrong Password')
    }
  }


  const setLastVisited1 = (user, channel) => {
    const lastVisited = users
      .child(user.uid)
      .child('lastVisited')
      .child(channel.id)
    lastVisited.set(firebase.database.ServerValue.TIMESTAMP)
    lastVisited.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP)
  }

  return (
    <>
      {' '}
      <Menu.Menu>
        <Menu.Item style={{ fontSize: '17px' }}>
          <span className='mains'>
            <LockOpen fontSize='large' />
            <span>Private             ({prichannelsState.length})</span>
          </span>
        </Menu.Item>
        {displayChannels()}
      </Menu.Menu>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    channel: state.channel.currentChannel,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectChannel: (channel) => dispatch(setChannel(channel)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Private)

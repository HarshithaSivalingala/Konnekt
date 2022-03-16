
import { Comment,Image, Segment, Message } from "semantic-ui-react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Avatar from 'react-avatar';
import "./MessageContent.css";
import React, { useState } from 'react';
import Picker from 'emoji-picker-react';

TimeAgo.locale(en);

const timeAgo = new TimeAgo();

const MessageContent = (props) => {
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const onEmojiClick = (event, emojiObject) => {
      setChosenEmoji(emojiObject);
    }; 
    return (        
        <Comment>
        <Avatar
        style={{marginRight:'10px'}}
        name={props.message.user.name}
        size={30}
        round='20px'
        />
        <Comment.Author as='a'>{props.message.user.name}</Comment.Author>
        <Comment.Content className={props.ownMessage ? "ownMessage" : null}>
            <Comment.Metadata>{timeAgo.format(props.message.timestamp)}</Comment.Metadata>
            {props.message.image ? <Image onLoad={props.imageLoaded} src={props.message.image} /> :
                <Comment.Text>{props.message.content}</Comment.Text>
                
            }
        </Comment.Content>
    </Comment>
    )
}

export default MessageContent;
import React, {useState} from "react";
import styled from "styled-components";
import {Button} from "@material-ui/core";
import {db} from "../firebase";
import {firebase} from "../firebase.js"

function ChatInput ({chatRef, chaneelName, channelId}) {
	const [input, setInput] = useState('');
    console.log(channelId);

	const sendMessage = (e) => {
		e.preventDefault();

		if (!channelId) {
			return false;
        }

		db.collection('rooms').doc(channelId).collection("messages").add({
			message: input,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			user: "xyz",
			userImage:""
		});

		chatRef.current.scrollIntoView({
				behavior: "smooth",
		});
		setInput('');
	};


	return (<ChatInputContainer>

	<form>
		<input value={input}
			onChange={(e) => setInput(e.target.value)} placeholder={`Message #${""}`} />
		<Button hidden type='submit' onClick={sendMessage}>
			SEND
		</Button>
	</form>
	</ChatInputContainer>
	)
}

export default ChatInput;
const ChatInputContainer = styled.div`
border-radius: 20px;

> form {
	position: relative;
	display: flex;
	justify-content: center;
}
> form > input {
	position: fixed;
	bottom: 30px;
	width: 60%;
	border-radius: 3px;
	border: 1px solid gray;
	padding: 20px;
	outline: none;
}
> form > button {
	display: none !important;
}
`;
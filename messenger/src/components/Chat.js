import "./App.css";
import { useEffect, useState, useRef } from "react";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import Message from "./Message";
import db from "../firebase";
import firebase from "../firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import logo1 from "../assests/logo1.png";

import { auth } from "./firebase";

const Chat = ({ user }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const messagesEndRef = useRef(null);
  const [password, setPassword] = useState("MessageMate");
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogout = () => {
    auth.signOut();
  };
  useEffect(() => {
    const val = prompt("Enter password");
    if (val !== password) {
      alert("Invalid password. Chat access denied.");
      setAuthenticated(false);
    } else {
      setUsername(prompt("Enter the user Name"));
      setAuthenticated(true);

      db.collection("messenger")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs
              .map((doc) => ({ id: doc.id, message: doc.data() }))
              .reverse()
          );
        });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (event) => {
    event.preventDefault();
    db.collection("messenger").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  if (!authenticated) {
    return <div>Access Denied</div>;
  }

  return (
    <div className="App">
      <div className="sub_head">
        <div className="logo_image">
          <img src={logo1} alt="IMGAE" className="ac_img" />
          <h3>Welcome {username}</h3>
        </div>
      </div>
      <h3 className="greet">
        IT'S POSHYA, LET'S make a chat experience that's both posh and
        delightful
      </h3>
      <div className="message-container">
        <FlipMove>
          {authenticated && // Check authentication status before rendering messages
            messages.map(({ id, message }) => {
              return (
                <Message
                  key={id}
                  username={username}
                  message={message}
                  timestamp={message.timestamp}
                />
              );
            })}
        </FlipMove>
        <div ref={messagesEndRef} />
      </div>

      <form className="app_form" onSubmit={sendMessage}>
        <FormControl className="app_formControl">
          <InputLabel>Enter a message</InputLabel>
          <Input
            className="app_input"
            placeholder="Enter a Message.... "
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton
            className="app_iconButton"
            type="submit"
            disabled={!input}
            variant="contained"
            color="primary"
            text="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
    </div>
  );
};

export default Chat;

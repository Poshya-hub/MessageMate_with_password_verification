import { Card, CardContent, Typography } from "@material-ui/core";
import React, { forwardRef } from "react";
import "./message.css";

const Message = forwardRef(({ message, username, timestamp }, ref) => {
  const isUser = username === message.username;

  return (
    <div ref={ref} className={`message ${isUser && "message_user"}`}>
      <Card className={isUser ? "message_userCard" : "message_guestCard"}>
        <CardContent>
          <Typography
            color="white"
            variant="h5"
            component="h2"
            className="msg_text"
          >
            {!isUser && `${message.username || "Unknown User"}: `}
            {message.message}
          </Typography>
          <Typography variant="caption" component="p" className="time">
            {new Date(timestamp?.toDate()).toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;

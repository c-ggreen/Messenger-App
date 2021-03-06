import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";

function Messages({ messages, name }) {
  return (
    <ScrollToBottom className="messages">
      {messages.map((message, i) => (
        <Message key={i} message={message} name={name} />
      ))}
    </ScrollToBottom>
  );
}

export default Messages;

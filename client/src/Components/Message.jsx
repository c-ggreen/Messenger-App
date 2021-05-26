import React from "react";

function Message({ message: { user, text }, name }) {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser ? (
    <div>
      <p>{trimmedName}</p>
      <div>
        <p>{text}</p>
      </div>
    </div>
  ) : (
    <div>
      <p>{user}</p>
      <div>
        <p>{text}</p>
      </div>
    </div>
  ))
}

export default Message;

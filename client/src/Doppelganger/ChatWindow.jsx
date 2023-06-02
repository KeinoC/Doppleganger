import React from "react";
import Message from "./Message";
import ChatHistory from "./ChatHistory";
import "./ChatStyle.css"

export default function ChatWindow() {


return (

    <div className="chat-window-container">
        <div className="chat-header">
            <h2>Chappie, Reese's ai assistant</h2>
        </div>

            <ChatHistory />

            <Message />

        <div className="chat-footer">
            <h4>Powered by Doppelgänger</h4>
        </div>
    </div>
);
}

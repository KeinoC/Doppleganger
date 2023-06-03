import React from "react"
import "./ChatStyle.css"
import { useData } from "../DataProvider/DataContext";

export default function Message () {


    const {sendMessageToServer, newMessage, setNewMessage, setChatHistory, chatHistory} = useData()

const messages = chatHistory


const chatLog = messages.map((message, index) => {
    return (
      <div key={index} className="chat-log-item-container">
        <div className="chat-log-item-header">
          <li>{message.time}</li>
          <h4>{message.sender}: </h4>
        </div>
        <p>{message.message}</p>
      </div>
    );
  });
return (

    <div className="chat-history-container">
{chatLog}
    </div>
)
}
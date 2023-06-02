import React from "react"
import "./ChatStyle.css"

export default function Message () {

const messages = [
    {
        id: 1,
        sender : "userName",
        message : "hello, how are you?",
        time : 1,
    },
    {
        id: 2,
        sender : "botName",
        message : "I'm great, just grabbing a byte!",
        time : 2,
    }
]


    const chatLog = messages.map(message =>{
        return (
            <div className="chat-log-item">
            <h4>{message.sender}</h4>
            <p>{message.message}</p>
            <li>{message.time}</li>
            </div>
        )
    })
return (

    <div className="chat-history-container">
{chatLog}
    </div>
)
}
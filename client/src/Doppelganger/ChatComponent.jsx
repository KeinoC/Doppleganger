import React, { useState, useEffect } from "react";
import "./ChatComponent.css"


export default function ChatComponent() {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageHistory, setMessageHistory] = useState([]);
    const [customizations, setCustomizations] = useState({
        "doppelganger": "Chappie",
        "user": "Reese",
        "stack": "React",
        "otherSkills": ["machine learning", "natural language processing", "artificial intelligence"]
    });

    const handleNewMessage = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setCurrentMessage(value);
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
        setMessageHistory([...messageHistory, {"user_message": currentMessage}]);
        setCurrentMessage("");


    }

    useEffect(() => {
        console.log(messageHistory);

        async function fetchData() {
            const response = await fetch("https://api.testapp365.com/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "username": "defaultuser",
                    "conversation_history": messageHistory
                })
            });

            const data = await response.json();
            setMessageHistory([...messageHistory, {"system_message": data.system_message}]);
        }

        // Determine who sent the last message
        if (messageHistory.length > 0 && !!messageHistory[messageHistory.length - 1]["user_message"]) {
            fetchData();
        }

    }, [messageHistory]);

    return (
        <div className="chat-box">
            <div className="chat-popup-icon">
                <img src="https://cdn.dribbble.com/users/160050/screenshots/9237862/media/dd331772cc3b2c9aa248b9d3a16ace86.gif"/>
            </div>
            <h1>This is {customizations.doppelganger}, {customizations.user}'s Doppelganger.</h1>
            <ul>
                {messageHistory.map((message, index) => {
                    if (!!message["user_message"]) {
                        return <li key={index}>
                            <pre>
                            {message["user_message"]}
                            </pre>
                            </li>
                    } else {
                        return <li key={index}>
                            <pre>
                            {message["system_message"]}
                            </pre>
                            </li>
                    }
                })}
            </ul>
            <form onSubmit={handleSendMessage}>
                <input value={currentMessage} onChange={handleNewMessage} type="text" />
                <button type="submit">Send</button>
            </form>


        </div>
    )
}
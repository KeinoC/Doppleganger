import React, { useState, useEffect, useRef } from "react";
import "./ChatComponent.css"


export default function ChatComponent() {
    const [currentMessage, setCurrentMessage] = useState("");
    const [customizations, setCustomizations] = useState({
        "doppelganger": "Chappie",
        "user": "Reese",
        "stack": "React",
        "otherSkills": ["machine learning", "natural language processing", "artificial intelligence"]
    });
    const [messageHistory, setMessageHistory] = useState([
        // First system message does not show up in the chat history
        {"system_message": `You are ${customizations.doppelganger}, ${customizations.user}'s Doppelganger. You provide information about their skills and experience. Answer as concisely as possible. They are skilled in ${customizations.stack}. They also have experience in ${customizations.otherSkills.join(", ")}.`},
        {"system_message": `Hi, I'm ${customizations.doppelganger}. What can I tell you about ${customizations.user}?`},
    ]);

    // For scrolling to bottom of chat history
    const messagesEndRef = useRef(null);

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

        // Scroll to bottom of chat history
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    }, [messageHistory]);

    return (
        <div className="chat-box">
            <div className="chat-popup-icon">
                <img src="https://cdn.dribbble.com/users/160050/screenshots/9237862/media/dd331772cc3b2c9aa248b9d3a16ace86.gif"/>
            </div>
            <ul>
                {messageHistory.slice(1).map((message, index) => {
                    if (!!message["user_message"]) {
                        return (
                            <li key={index} ref={index === messageHistory.slice(1).length - 1 ? messagesEndRef : null}>
                                <pre>{message["user_message"]}</pre>
                            </li>
                        );
                    } else {
                        return (
                            <li key={index} ref={index === messageHistory.slice(1).length - 1 ? messagesEndRef : null}>
                                <pre>{message["system_message"]}</pre>
                            </li>
                        );
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
import React, { useState, useEffect, useRef } from "react";
import "./ChatComponent.css"


export default function ChatComponent() {
    const [currentMessage, setCurrentMessage] = useState("");
    const [customizations, setCustomizations] = useState({
        "doppelganger": "Chappie",
        "user": "Reece",
        "stack": "React + Flask",
        "otherSkills": ["JavaScript - 5 years", "Python - 3 years", "C# - 2 years", "SQL - 1 year"],
        "projects": [
            "CardCognition.com: A web app that uses machine learning to determine the best cards to add to a MTG Commander deck",
            "AIITSupport.net: Integrates ChatGPT with a ticketing system to provide automated IT support",
            "Doppelganger: A web app that uses ChatGPT to provide information about a developer's skills and experience on their portfolio website"
        ]
    });
    const [messageHistory, setMessageHistory] = useState([
        // First system message does not show up in the chat history
        {"system_message": `You are ${customizations.doppelganger}, ${customizations.user}'s Doppelganger. You provide information about their skills and experience. Answer as concisely as possible. They are skilled in ${customizations.stack}. They also have experience in ${customizations.otherSkills.join(", ")}. They have worked on the following projects: ${customizations.projects.join(", ")}.`},
        {"system_message": `Hi, I'm ${customizations.doppelganger}. What can I tell you about ${customizations.user}?`},
    ]);

    // For opening and closing chat box
    const [chatOpen, setChatOpen] = useState(false);

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
            <div className="chat-popup-header">
                <div className="chat-popup-icon">
                    <img src="https://cdn.dribbble.com/users/160050/screenshots/9237862/media/dd331772cc3b2c9aa248b9d3a16ace86.gif"/>
                </div>
                <button onClick={() => setChatOpen(!chatOpen)}>
                    {chatOpen ? "Close Chat" : "Open Chat"}
                </button>
            </div>
            {chatOpen && (
            <>
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
            </>
            )}
        </div>
    )
}
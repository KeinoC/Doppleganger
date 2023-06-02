import React, {useContext, useEffect} from "react"
import "./ChatStyle.css"
import { useData } from "../DataProvider/DataContext";

export default function Message () {

    const {sendMessageToServer, newMessage, setNewMessage, setChatHistory, chatHistory} = useData()

    function handleNewMessage(e) {
        e.preventDefault()
        const value = JSON.stringify(e.target.value)
        setNewMessage({user_message: value})
    }

    // console.log(newMessage)

    async function handleSendMessage(e) {
        e.preventDefault();
        setChatHistory([...chatHistory, newMessage]); // Update conversation history with new message
        await sendMessageToServer(); // Wait for the message to be sent to the server
        setNewMessage({}); // Clear the new message
        e.target.reset();
      }
    
console.log(chatHistory)


return (
    <form value={newMessage} onSubmit={(e)=>handleSendMessage(e)} className="message-box-container">
        <textarea value={newMessage.userMessage} onChange={handleNewMessage} className="message-box-text flex-grow resize-none py-2 px-4 rounded-lg border-gray-300" type="text"></textarea>
    <button className="send-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit"> Send </button>
    </form>
)
}
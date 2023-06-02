import React from "react"
import "./ChatStyle.css"

export default function Message () {

return (
    <form className="message-box-container">
        <textarea className="message-box-text" type="text"></textarea>
    <button className="send-button" type="submit"> Send </button>
    </form>
)
}
import React from "react";
import Team from "./Team"
import "./Contact.css"

export default function Contact() {
    return (
        <div className="contact-page scroll-snap-align-start h-full min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
            <div className="team-container bg-white bg-opacity-25 rounded-lg p-10">
            <h1 className="team-header text-5xl text-white font-bold">Meet The Team</h1>
            <Team />
            </div>
        </div>
    )
}
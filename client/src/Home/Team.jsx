import React from "react";
import { FaLinkedin } from 'react-icons/fa';
import "./Team.css"

export default function Team() {

    const links = [
        {
            id: 1,
            img: "https://ca.slack-edge.com/T02MD9XTF-U04GVCE9V36-cc3644341b8a-512",
            name: "Chris",
            href: 'https://www.linkedin.com/in/chris-choute',
        },
        {
            id: 2,
            img: "https://ca.slack-edge.com/T61B4TZ6Y-U057C0BUX97-1e941262c1b7-512", // replace with real image link
            name: "Keino",
            href: 'https://www.linkedin.com/in/keinoc',
        },
        {
            id: 3,
            img: "https://kenneththedev.netlify.app/static/media/Profilepic.2548ec6385014eacdec7.jpg", // replace with real image link
            name: "Kenneth",
            href: 'https://www.linkedin.com/in/kenneth-the-dev/',
        },
        {
            id: 4,
            img: "https://reece-vela.com/images/selfie-pic-paint.webp",
            name: "Reece",
            href: 'https://www.linkedin.com/in/reece-vela/',
        },
    ]

    return (
        <div className="about-page">
            {links.map(({id, img, name, href}) => (
                <div className="team-member-container" key={id}>
                    <div className="team-member-image-container">
                        <img src={img} alt={name} />
                    </div>

                    <div className="team-member-info-container">
                        <h2>{name}</h2>
                    </div>

                    <div className="team-member-links-container">
                        <a href={href} target="_blank" rel="noreferrer">
                            LinkedIn <FaLinkedin size={50}/>
                        </a>
                    </div>

                </div>
            ))}
        </div>
    );
}

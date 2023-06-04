import React from "react";
import { FaLinkedin } from 'react-icons/fa';
import "./Team.css"

export default function Team() {

    const links = [
        {
            id: 1,
            img: "https://avatars.githubusercontent.com/u/78870076?v=4",
            name: "Chris",
            href: 'https://www.linkedin.com/in/chris-choute',
        },
        {
            id: 2,
            img: "https://avatars.githubusercontent.com/u/xxxxxx?v=4", // replace with real image link
            name: "Keinoc",
            href: 'https://www.linkedin.com/in/keinoc',
        },
        {
            id: 3,
            img: "https://avatars.githubusercontent.com/u/yyyyyy?v=4", // replace with real image link
            name: "Kenneth",
            href: 'https://www.linkedin.com/in/kenneth-the-dev/',
        }
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

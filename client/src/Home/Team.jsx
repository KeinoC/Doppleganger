import React from "react";
import { FaLinkedin } from 'react-icons/fa';
import "./Team.css"

export default function Team() {

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

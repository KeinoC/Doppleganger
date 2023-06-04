import React from "react";
import Team from "./Team"
import "./About.css"

export default function About() {
    return (
        <div className=" h-full min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
            <div className="about-container bg-white bg-opacity-25 rounded-lg p-10">
            <h1 className=" about-container mx-auto flex items-center text-5xl text-white font-bold">About Doppelganger</h1>
            <iframe width="786" height="556" src="https://www.youtube.com/embed/bHH0DvoK7Nw" title="Doppelganger - MLH Hack Your Portfolio 2023" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
        </div>
    )
}

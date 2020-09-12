import React from "react";
import {BrowserRouter as Router, Link} from "react-router-dom";
import Login from "./Login";

export const NavBar = () => {
    return (
        <div>
            <nav>
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo">Портал новостей</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to="/">Главная</Link></li>
                        <li><Link to="/news">Новости</Link></li>
                        <Login/>
                    </ul>

                </div>
            </nav>
        </div>
    )
}

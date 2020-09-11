import React from "react";
import {Link} from "react-router-dom";

export const NavBar = () => {
    return (
        <div>
            <nav>
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo">Портал новостей</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to="/">Главная</Link></li>
                        <li><Link to="/news">Новости</Link></li>
                        <li><a href="collapsible.html">Вход</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

import React from "react";
import {BrowserRouter as Router, Link} from "react-router-dom";
import Login from "./Login";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/reducers/rootReducer";
import {Button} from "react-materialize";
import {setUserId} from "../store/action/app";

export const NavBar = () => {
    const isAuth = useSelector((state: RootState) => state.app.userData.isAuth)
    const dispatch = useDispatch()
    return (
        <div>
            <nav>
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo">Портал новостей</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to="/">Главная</Link></li>
                        <li><Link to="/news">Новости</Link></li>
                        <Login/>
                        {isAuth && <Button
                          onClick={() => dispatch(setUserId({
                                id: null,
                                email: null,
                                password: null,
                                isAdmin: false,
                                isAuth: false,
                            }
                            ))}>Выход</Button>}
                    </ul>

                </div>
            </nav>
        </div>
    )
}

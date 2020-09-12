import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import './App.scss';
import {NavBar} from "./components/NavBar";
import {useRoutes} from "./router/routes";

function App() {
    const routes = useRoutes()
    return (
        <div className="App">
            <div >
                <Router>
                    <NavBar/>
                    <div className="App-content">
                        {routes}
                    </div>
                </Router>
            </div>
        </div>
);
}

export default App;

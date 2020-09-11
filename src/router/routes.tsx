import React from "react";
import { Switch, Route } from "react-router-dom";
import {HomePage} from "../pages/home/HomePage";
import {HOME, NEWS} from "./enum";
import {NewsPage} from "../pages/news/NewsPage";
import {NotFoundPage} from "../pages/notFound/NotFoundPage";

export const useRoutes = () => {
    return (
        <Switch>
            <Route exact path={HOME} component={HomePage}/>
            <Route exact path={NEWS} component={NewsPage}/>
            <Route exact component={NotFoundPage}/>
        </Switch>
    )
}

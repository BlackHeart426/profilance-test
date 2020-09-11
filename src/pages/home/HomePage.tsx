import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";

export const HomePage = (props: any) => {
    const isAuth = useSelector((state: RootState) => state.app.isAuth)
    return (
        <div className="Home-container">
            "Привет, Гость"
            {isAuth ? 'true' : 'false'}
        </div>
    )
}

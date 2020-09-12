import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";

export const HomePage = (props: any) => {
    const email = useSelector((state: RootState) => state.app.userData.email)
    return (
        <div className="Home-container">
            Привет, {email ? email : 'Гость'}

        </div>
    )
}

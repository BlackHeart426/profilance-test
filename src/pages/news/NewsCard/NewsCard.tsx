import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/reducers/rootReducer";


export const NewsCard = (props: any) => {


    const {news, isAuth} = props
    return (
        <div className="NewsCard-container">
            <div className="row">
                <div className="col s12 m12">
                    <div className="card white darken-1">
                        <div className="card-content black-text">
                            <div style={{textAlign: "right"}}>
                                {news.approval ? <a className="blue-text" >Одобрено</a> : <a className="red-text">Не одобрено</a>}
                            </div>
                            <span className="card-title">{news.title}</span>
                            <p>{news.description}</p>
                        </div>
                        {isAuth
                            && <div className="card-action">
                                <a className="green-text" href="#">Одобрить</a>
                                <a className="red-text" href="#">Удалить</a>
                        </div>}
                    </div>
                </div>
            </div>

        </div>
    )
}

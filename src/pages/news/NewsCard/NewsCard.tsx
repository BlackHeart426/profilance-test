import React from "react";
import moment from "moment";

export const NewsCard = (props: any) => {


    const {news, userData, onApproveNews, onRemoveNews} = props
    return (
        <div className="NewsCard-container">
            <div className="row">
                <div className="col s12 m12">
                    <div className="card white darken-1">
                        <div className="card-content black-text">

                            {userData.isAdmin
                                &&<div style={{textAlign: "right"}}>
                                    {news.approval ? <a className="blue-text" >Одобрено</a> : <a className="red-text">Не одобрено</a>}
                                </div>
                            }
                            <span className="card-title">{news.title}</span>
                            <p>{news.description}</p>
                            <p style={{textAlign: "right", color: "#999999"}}>{moment(news.dateCreator).format('LL')}
                            </p>
                        </div>
                        {userData.isAdmin
                            && <div className="card-action">
                                {news.approval == false
                                    && <a
                                      className="green-text"
                                      style={{cursor: "pointer"}}
                                      onClick={() => onApproveNews(news.id)}
                                    >Одобрить</a>}
                                <a
                                  className="red-text"
                                  style={{cursor: "pointer"}}
                                  onClick={() => onRemoveNews(news.id)}
                                >Удалить</a>
                        </div>}
                    </div>
                </div>
            </div>

        </div>
    )
}

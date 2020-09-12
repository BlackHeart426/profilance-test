import React, {useEffect, useState} from "react";
import {NewsCard} from "./NewsCard/NewsCard";
import Axios from "axios";
import {useSelector} from "react-redux";
import './NewsPage.scss';
import {RootState} from "../../store/reducers/rootReducer";

export interface INews {
    id?: number | null,
    userId: number | null,
    title: string | null,
    description: string | null,
    dateCreator: number | null,
    approval: boolean
}

export const News = {
    id: null,
    userId: null,
    title: null,
    description: null,
    dateCreator: null,
    approval: false
}


export const NewsPage = (props: any) => {
    const userData = useSelector((state: RootState) => state.app.userData)
    const [newsData, setNewsData] = useState<INews[]>([])
    const [filter, setFilter] = useState<string>('')
    const [showAddNews, setShowAddNews] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [dataSaveNews, setDataSaveNews] = useState<INews>({
        userId: null,
        title: null,
        description: null,
        dateCreator: null,
        approval: false
    })

    const getData = async () => {
        setLoading(true)
        try {
            const response = await Axios.get('/newsData')
            setNewsData(response.data.map((item: INews ) => ({...item})))
            setLoading(false)
        } catch (e) {
            console.log(e)
        }
    }

    const setData = async (news: INews) => {
        setLoading(true)
        try {
            const data = {
                userId: 1,
                title: news.title,
                description: news.description,
                dateCreator: Date.now(),
                approval: userData.isAdmin ? true : false
            }

            const response = await Axios.post('/newsData', data)
            setNewsData([...newsData, {...data, id: response.data.id}])
            setLoading(false)
        } catch (e) {
            console.log(e)
        }
    }

    const handleApproveNews = async (idNews: number) => {
        setLoading(true)
        try {
            const response = await Axios.patch(`/newsData/${idNews}`, {approval: true})
            const data = newsData.map((item: any) => {
                return (item.id === idNews ? ({...item , approval: true}) : item)
            })
            setNewsData(data)
            setLoading(false)
        } catch (e) {
            console.log(e)
        }
    }

    const handleRemoveNews = async (idNews: number) => {
        setLoading(true)
        try {
            const response = await Axios.delete(`/newsData/${idNews}`)
            setNewsData( newsData.filter((item: any) => item.id !== idNews))
            setLoading(false)
        } catch (e) {
            console.log(e)
        }
    }

    const handleShowAddUser = () => {
        setShowAddNews(prevState => !prevState)
    }

    const handleFiler = (event: any) => {
        setFilter(event.currentTarget.value)
    }

    const handleSaveInput = (event: any) => {
        setDataSaveNews({...dataSaveNews, [event.currentTarget.id]: event.currentTarget.value})
    }

    const handleSaveDataNews = () => {
        setShowAddNews(prevState => !prevState)
        setData(dataSaveNews)
    }

    const filterGuest = (item: any) => {
        return item
    }

    useEffect(() => {
        getData()
    },[])

    return (
        <div className="News-container">
            {loading
            && <div  className="News-loader"  >
                < div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-blue-only">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div>
                        <div className="gap-patch">
                            <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>
            </div>}
            <div className="News-filter">
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="filter" type="text" className="validate" onChange={handleFiler}/>
                                <label htmlFor="filter">Фильтр</label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {userData.isAuth
                && <div className="News-action">
                    <a className="waves-effect waves-light btn" onClick={handleShowAddUser}>Добавить новость</a>
                </div>
            }
            <div className="App-add-user-content" style={showAddNews ? {display: "block"} : {display: "none"}}>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s3">
                                <input id="title" type="text" className="validate" onBlur={handleSaveInput}/>
                                <label htmlFor="title">Заголовок</label>
                            </div>
                            <div className="input-field col s3">
                                <input id="description" type="text" className="validate" onBlur={handleSaveInput}/>
                                <label htmlFor="description">Описание</label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="App-action">
                    <a className="waves-effect waves-light btn" onClick={handleSaveDataNews}>Сохранить новость</a>
                </div>

            </div>
            <div className="News-content">
                {newsData.filter((item: any) => {
                    if (!userData.isAuth) {
                        return  item.approval != false && item
                    } else {
                        return item
                    }
                    }).filter((item: any) => {
                    if (userData.isAuth && !userData.isAdmin) {
                        return  item.userId === userData.id && item
                    } else {
                        return item
                    }
                    })
                    .filter((item: any) => {
                    return item.title.toLowerCase().includes(filter.toLowerCase())
                        || item.description.toLowerCase().includes(filter.toLowerCase())
                    })
                    .map((news: any) =>
                    <NewsCard key={news.id} news={news} userData={userData} onApproveNews={handleApproveNews} onRemoveNews={handleRemoveNews}/>
                )}

            </div>
        </div>
    )
}

import React, {useEffect, useState} from "react";
import {NewsCard} from "./NewsCard/NewsCard";
import Axios from "axios";
import {isAuth} from "../../store/action/app";
import {useSelector} from "react-redux";
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
    const isAuth = useSelector((state: RootState) => state.app.isAuth)
    const userId = useSelector((state: RootState) => state.app.userId)
    const [newsData, setNewsData] = useState<INews[]>([])
    const [filter, setFilter] = useState<string>('')
    const [showAddNews, setShowAddNews] = useState<boolean>(false)
    const [dataSaveNews, setDataSaveNews] = useState<INews>({
        userId: null,
        title: null,
        description: null,
        dateCreator: null,
        approval: false
    })

    const getData = async () => {
        try {
            const response = await Axios.get('/newsData')
            setNewsData(response.data.map((item: INews ) => ({...item})))
        } catch (e) {
            console.log(e)
        }
    }

    const setData = async (news: INews) => {
        try {
            const data = {
                userId: 1,
                title: news.title,
                description: news.description,
                dateCreator: Date.now(),
                approval: isAuth ? true : false
            }
             console.log('data', data)

            const response = await Axios.post('/newsData', data)
            setNewsData([...newsData, {...data, id: response.data.id}])
        } catch (e) {
            console.log(e)
        }
    }

    const handleApproveNews = async (idNews: number) => {
        try {
            const response = await Axios.patch(`/newsData/${idNews}`, {approval: true})
            const data = newsData.map((item: any) => {
                return (item.id === idNews ? ({...item , approval: true}) : item)
            })
            setNewsData(data)
        } catch (e) {
            console.log(e)
        }
    }

    const handleRemoveNews = async (idNews: number) => {
        try {
            const response = await Axios.delete(`/newsData/${idNews}`)
            setNewsData( newsData.filter((item: any) => item.id !== idNews))
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


    useEffect(() => {
        getData()
    },[])

    return (
        <div className="News-container">
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
            <div className="News-action">
                <a className="waves-effect waves-light btn" onClick={handleShowAddUser}>Добавить клиента</a>

            </div>
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
                    <a className="waves-effect waves-light btn" onClick={handleSaveDataNews}>Сохранить клиента</a>
                </div>
            </div>
           <div className="News-content">
               {newsData.filter((item: any) => {
                   return item.title.toLowerCase().includes(filter.toLowerCase())
                       || item.description.toLowerCase().includes(filter.toLowerCase())
               }).map((news: any) =>
                   <NewsCard key={news.id} news={news} isAuth={isAuth} onApproveNews={handleApproveNews} onRemoveNews={handleRemoveNews}/>
               )}

           </div>
        </div>
    )
}

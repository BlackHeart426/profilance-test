import React, {Component, useEffect, useState} from "react";
import {Button, Modal} from "react-materialize";
import {INews} from "../pages/news/NewsPage";
import Axios from "axios";

export interface ILogin {
    email: string,
    password: string,
}

const Login = (props: any) => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [dataSaveUser, setDataSaveUser] = useState<ILogin>({
        email: 'test@gmail.com',
        password: '8495fj4',
    })
    const trigger = <Button>Вход</Button>;

    const handleSaveInput = (event: any) => {
        setDataSaveUser({...dataSaveUser, [event.currentTarget.id]: event.currentTarget.value})
    }

    const getUser = async (dataSaveUser: ILogin) => {
        try {
            const response = await Axios.get(`/users?email=${dataSaveUser.email}`)
            console.log(response.data[0].password)
            if (response.data[0].password === dataSaveUser.password) {
                console.log('Аторизирован')
                setError('')
                setShowModal(true)

            } else {
                setError('Пароль неверен')
                console.log('Пароль неверен')
            }
        } catch (e) {
            setError('Такого пользователя нет')
            console.log('Такоо пользователя нет')
        }
    }

    const handleCheckUser = () => {
        getUser(dataSaveUser)
        // setShowAddNews(prevState => !prevState)
        // setData(dataSaveNews)
    }

    return (<>
        {!showModal &&<Modal header="Авторизация" trigger={trigger}>
            <div className="Login-content">
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s3">
                                <input id="email" type="text" className="validate" value={dataSaveUser.email} onChange={handleSaveInput} />
                                <label htmlFor="email">email</label>
                            </div>
                            <div className="input-field col s3">
                                <input id="password" type="text" className="validate" value={dataSaveUser.password} onChange={handleSaveInput}/>
                                <label htmlFor="password">Пароль</label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="Login-error">
                    {error}
                </div>
                <div className="App-action">
                    <a className="waves-effect waves-light btn" onClick={handleCheckUser}>Логин</a>
                </div>
            </div>
        </Modal>}
            </>
    )
}


export default Login

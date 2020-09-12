import React, {Component, useEffect, useState} from "react";
import {Button, Modal} from "react-materialize";
import {INews} from "../pages/news/NewsPage";
import Axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setUserId} from "../store/action/app";
import {RootState} from "../store/reducers/rootReducer";

export interface ILogin {
    email: string,
    password: string,
}

const Login = (props: any) => {
    const dispatch = useDispatch()
    const isAuth = useSelector((state: RootState) => state.app.userData.isAuth)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [dataSaveUser, setDataSaveUser] = useState<ILogin>({
        email: 'test@gmail.com',
        password: '8495fj4',
    })

    useEffect(() => {
        M.updateTextFields();
    }, [showModal])
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
                setShowModal(false)
                dispatch(setUserId({...response.data[0], isAuth: true}))

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
    }


    return (
        <>
        {!isAuth &&
            <><Button onClick={() => setShowModal(prevState => !prevState)}>Вход</Button>
            <Modal header="Авторизация" open={showModal}>
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
                    <a className="waves-effect waves-light btn" data-target="modal1" onClick={handleCheckUser}>Логин</a>
                </div>
            </div>
        </Modal></>}
        </>
    )
}


export default Login

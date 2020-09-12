import {EReduxActionTypes} from "../types";

const initialState = {
    isAuth: true,
    userData: {
        id: null,
        email: null,
        password: null,
        isAdmin: false,
        isAuth: false,
    }
}

interface IAction {
    type: string,
    data: any
}

export interface IUser {
    id: number | null,
    email: string | null,
    password: string | null,
    isAdmin: boolean,
    isAuth: boolean,
}

export interface IApp {

    userData: IUser
}

export const appReducer = (state: IApp = initialState, action: IAction) => {
    switch (action.type) {
        case EReduxActionTypes.USER_DATA:
            return Object.assign({}, state, {
                userData: Object.assign({}, state.userData, action.data)
            })
        default:
            return state
    }
}

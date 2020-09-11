import {EReduxActionTypes} from "../types";

const initialState = {
    isAuth: true,
    userId: null
}

interface IAction {
    type: string,
    data: any
}

export interface IApp {
    isAuth: boolean,
    userId: number | null
}

export const appReducer = (state: IApp = initialState, action: IAction) => {
    switch (action.type) {
        case EReduxActionTypes.IS_AUTH:
            return Object.assign({}, state, {
                isAuth: action.data
            })
        case EReduxActionTypes.USER_ID:
            return Object.assign({}, state, {
                userId: action.data
            })
        default:
            return state
    }
}

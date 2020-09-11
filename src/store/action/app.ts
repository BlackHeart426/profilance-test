import {IReduxBaseAction} from "../reducers/rootReducer";
import {EReduxActionTypes} from "../types";

export interface IReduxOpenDrawerAction extends IReduxBaseAction{
    type: EReduxActionTypes.IS_AUTH
}

export function isAuth(flagAuth: boolean) {
    return {
        type: EReduxActionTypes.IS_AUTH,
        data: flagAuth
    }
}

export function setUserId(flagAuth: number) {
    return {
        type: EReduxActionTypes.IS_AUTH,
        data: flagAuth
    }
}

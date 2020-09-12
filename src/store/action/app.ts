import {IReduxBaseAction} from "../reducers/rootReducer";
import {EReduxActionTypes} from "../types";

export interface IReduxOpenDrawerAction extends IReduxBaseAction{
    type: EReduxActionTypes.USER_DATA
}

export function setUserId(data: any) {
    return {
        type: EReduxActionTypes.USER_DATA,
        data: data
    }
}

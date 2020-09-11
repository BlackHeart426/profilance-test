import {EReduxActionTypes} from "../types";
import {combineReducers} from "redux";
import {appReducer, IApp} from "./appReducer";

export interface RootState {
    app: IApp,

}

export interface IReduxBaseAction {
    type: EReduxActionTypes
}

const rootReduce = combineReducers({
    app: appReducer,
})

export type AppState = ReturnType<typeof rootReduce>

export default rootReduce




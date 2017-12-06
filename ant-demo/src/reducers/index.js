
import {combineReducers} from "redux";
import {RECEIVE_LIST, addReceiveList} from "../actions/category";

function category(state = [], action){
    switch (action.type){
        case RECEIVE_LIST:
            return action.list;
    }

    return state;
}

export default combineReducers({
    categorys: category
});


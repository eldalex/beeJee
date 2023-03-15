import {settodolist} from "../../actions";
import axios from "axios";
import {API_URL} from "../../index";

export const reloadToDoList=(dispatch)=>{
    getToDoList().then(data=>{dispatch(settodolist(data.payload))})
}

const getToDoList = async () => {
    return ({payload: (await axios.get(API_URL + '/todos')).data})
}

import axios from "axios";
import Topic  from "../services/Topic";

export const getTopic = () => async(dispatch) => {
    try{
        const res = await Topic.getTopic();
        dispatch({
            type: 'GET_TOPIC',
            payload: res.data,
        })
    }catch (err) {
        console.log(err);
    }
}
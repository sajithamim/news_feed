import { http } from "../http-common";
import axios from 'axios';

const getFeed=(page)=>{
    return http.get(`poll/feedback/?page=${page ? page : 1}`)
}

const Feedback = {
    getFeed
}

export default Feedback;
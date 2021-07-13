import {instance, http} from "../http-common";
import axios from 'axios';

const API_URL = "http://178.18.246.233:8000/api/";

const getTopic = () => {
  return http.get("topic/topic");
};

const Topic = {
  getTopic
};
  
export default Topic;
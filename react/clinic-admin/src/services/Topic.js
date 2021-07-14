import { http} from "../http-common";

const getTopic = () => {
  return http.get("topic/topic");
};
const deleteTopic = (id) => {
  return http.delete(`topic/topic/${id}`);
};
const postTopic = (state) => {
  return http.post(`topic/topic/`, state);
};
const Topic = {
  getTopic,
  deleteTopic,
  postTopic
};
  
export default Topic;
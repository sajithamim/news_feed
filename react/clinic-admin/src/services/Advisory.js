
import { http } from "../http-common";
import axios from 'axios';


const getAdvisoryMembersList = (id) => {
    return http.get(`spec/advisory/${id}/`);
};
const postAdvisoryMembersList = (advisoryData) => {
  return http.post("spec/advisory/" , advisoryData);
};

  const Advisory = {
    getAdvisoryMembersList,
    postAdvisoryMembersList
  }

  export default Advisory;
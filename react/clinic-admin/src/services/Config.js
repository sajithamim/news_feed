import { http } from "../http-common"

const getConfiguration = () => {
    return http.get("poll/addsetting/");
};

const postConfiguration = (state) => {
    return http.post("poll/addsetting/", state);
}

const updateConfiguration = (state) => {
    return http.put(`poll/addsetting/`, state);
  }

const Config = {
    postConfiguration,
    getConfiguration,
    updateConfiguration,
}

export default Config;
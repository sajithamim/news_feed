import { http } from "../http-common"

const postConfiguration = (state) => {
    return http.post("poll/addsetting/" , state);
}

const Config = {
    postConfiguration
}

export default Config;
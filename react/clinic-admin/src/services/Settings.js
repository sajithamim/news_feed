import { http } from "../http-common"

const  getSettings = () => {
    return http.get("poll/settings");
}
const  postSettings = (state) => {
    console.log("service sttea", state);
    return http.post(`poll/settings/` , state);
}
const Settings = {
    getSettings,
    postSettings 

}

export default Settings;
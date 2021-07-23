import { http } from "../http-common"

const  getSettings = () => {
    return http.get("poll/settings");
}
const  patchSettings = (id , state) => {
    return http.patch(`poll/settings/${id}/` , state);
}
const Settings = {
    getSettings,
    patchSettings
}

export default Settings;
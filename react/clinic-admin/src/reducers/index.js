import { combineReducers } from "redux";
import spec from "./spec.js";
import auth from "./auth.js";
import message from "./message.js";

export default combineReducers({
    spec,
    auth,
    message,
});
import { combineReducers } from "redux";
import spec from "./spec.js";
import auth from "./auth.js";
import message from "./message.js";
import category from "./category.js";
import users from "./users.js";

export default combineReducers({
    spec,
    category,
    auth,
    message,
    users
});
import { combineReducers } from "redux";
import spec from "./spec.js";
import auth from "./auth.js";
import message from "./message.js";
import category from "./category.js";
import users from "./users.js";
import topic from "./topic.js";
import feedback from "./feedback.js";
import settings from "./settings.js";
import ads from "./ads.js";
import genAds from "./genAds.js";

export default combineReducers({
    spec,
    category,
    auth,
    message,
    users,
    topic,
    feedback,
    settings,
    ads,
    genAds
});
import React, {useEffect ,  useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import OverviewContent from './pages/Overview/OverviewContent';
import Login from './pages/Login/Login';
import Forgot from './pages/Login/Forgot';
import Reset from './pages/Login/Reset';
import SpecializationContent from "./pages/specialization/SpecializationContent";
import SubSpecialization from "./pages/specialization/SubSpecializationContent";
import AdvisoryBoardContent from "./pages/specialization/AdvisoryBoardContent"
import TopicsContent  from './pages/Topics/TopicsContent';
import CategoriesContent from './pages/Category/CategoriesContent';
import Feedback from './pages/Feedback/Feedback';
import Users from './pages/Users/Users';
import Policy from './pages/Settings/Policy';
import Terms from './pages/Settings/Terms';
import About from './pages/Settings/About';
import Contact from './pages/Settings/Contact';
import UserDetails from './pages/Users/UserDetails';
import SpecialityAdsList from './pages/SpecialityAds/SpecialityAdsList';
import GenAdvertisementContent from './pages/GeneralAdvertisements/GenAdvertisementContent';
import SpecialityAds from './pages/SpecialityAds/AddSpecialityAds';
import QuizContent from './pages/Quiz/QuizContent';
import Configuration from './pages/Configuration/Configuration';
import Verify from "./pages/Verification/Verify";
import AdminRoute from "./Layouts/AdminRoute";
import AuthRoute from "./Layouts/AuthRoute";
import ClinicRoute from './Layouts/ClinicRoute';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./actions/auth.js"
import { useHistory } from "react-router-dom";
function App() {

  const { user } = useSelector(state => {
    return state.auth;
  });

  const [signoutTime, setSignoutTime] = useState(900000);
  const [warningTime, setWarningTime] = useState(900000);
  let warnTimeout;
  let logoutTimeout;
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  let history = useHistory();
  
  const warn = () => {
    alert("You are idle for several minutes");
  };
  const sessionlogout = () => {
    const clearToken = localStorage.clear();
    dispatch(logout());
  }

  const destroy = () => {
    console.log('Session destroyed');
  }
  const setTimeouts = () => {
    warnTimeout = setTimeout(warn, warningTime);
    logoutTimeout = setTimeout(sessionlogout, signoutTime);
  };

  const clearTimeouts = () => {
    if (warnTimeout) clearTimeout(warnTimeout);
    if (logoutTimeout) clearTimeout(logoutTimeout);
  };

  useEffect(() => {
    if (accessToken === 'null' && accessToken === ' undefined'){
      history.push("/");
    }
    const events = [
      'load',
      'mousemove',
      'mousedown',
      'click',
      'scroll',
      'keypress'
    ];

    const resetTimeout = () => {
      clearTimeouts();
      setTimeouts();
    };

    for (let i in events) {
      window.addEventListener(events[i], resetTimeout);
    }

    setTimeouts();
    return () => {
      for (let i in events) {
        window.removeEventListener(events[i], resetTimeout);
        clearTimeouts();
      }
    }
  }, []);
  return (
    <Router>
        <Switch>
          <AdminRoute path="/data" exact component={OverviewContent} />
          <AdminRoute path="/categories" exact component={CategoriesContent} />
          <AdminRoute path="/topics" exact component={TopicsContent} />
          <AdminRoute path="/specializations" exact component={SpecializationContent} />
          <AdminRoute path="/sub_specialization/:specId" exact component={SubSpecialization} />
          <AdminRoute path="/feedback" exact component={Feedback} />
          <AdminRoute path="/users" exact component={Users} />
          <AdminRoute path="/privacy_policy" exact component={Policy} />
          <AdminRoute path="/about" exact component={About} />
          <AdminRoute path="/contact" exact component={Contact} />
          <AdminRoute path="/advertisements" exact component={SpecialityAdsList} />
          <AdminRoute path="/terms" exact component={Terms} />
          <AdminRoute path="/new_add/" exact component={SpecialityAds} />
          <AdminRoute path="/configuration/" exact component={Configuration} />
          <AdminRoute path="/quiz" exact component={QuizContent} />
          <AdminRoute path="/advisory_board/:specId" exact component={AdvisoryBoardContent} />
          <AdminRoute path="/edit_add/:adsId" exact component={SpecialityAds} />
          <AdminRoute path="/userdetails/:emailId" exact component={UserDetails} />
          <AdminRoute path="/genads/" exact component={GenAdvertisementContent} />
          <AuthRoute path="/forgot_password" exact component={Forgot} />
          <AuthRoute path="/reset_password/" exact component={Reset} />
          <AuthRoute exact path={["/", "/login"]} component={Login} />
          <ClinicRoute path="/verify" exact component={Verify} />
        </Switch>
    </Router>
  );
}

export default App;

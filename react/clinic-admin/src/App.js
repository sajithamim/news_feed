import React, {useEffect ,  useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import OverviewContent from './pages/Overview/OverviewContent';
import Login from './pages/Login/Login';
import NoConnection from './pages/Login/NoConnection';
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
import AdminLayout from "./Layouts/AdminLayout/AdminLayout";
import { PrivateRoute } from './PrivateRoute';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "./actions/auth.js"

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
      <AdminLayout>
        <Switch>
          <PrivateRoute path="/data" exact component={OverviewContent} />
          <PrivateRoute path="/noconnection" exact component={NoConnection} />
          <PrivateRoute path="/categories" exact component={CategoriesContent} />
          <PrivateRoute path="/topics" exact component={TopicsContent} />
          <PrivateRoute path="/specializations" exact component={SpecializationContent} />
          <PrivateRoute path="/sub_specialization/:specId" exact component={SubSpecialization} />
          <PrivateRoute path="/feedback" exact component={Feedback} />
          <PrivateRoute path="/users" exact component={Users} />
          <PrivateRoute path="/privacy_policy" exact component={Policy} />
          <PrivateRoute path="/about" exact component={About} />
          <PrivateRoute path="/contact" exact component={Contact} />
          <PrivateRoute path="/advertisements" exact component={SpecialityAdsList} />
          <PrivateRoute path="/terms" exact component={Terms} />
          <PrivateRoute path="/new_add/" exact component={SpecialityAds} />
          <PrivateRoute path="/advisory_board/:specId" exact component={AdvisoryBoardContent} />
          <PrivateRoute path="/edit_add/:adsId" exact component={SpecialityAds} />
          <PrivateRoute path="/userdetails/:emailId" exact component={UserDetails} />
          <PrivateRoute path="/genads/" exact component={GenAdvertisementContent} />
          <Route path="/forgot_password" exact component={Forgot} />
          <Route path="/reset_password/" exact component={Reset} />

          {/* <Route path="/login"  component={Login} /> */}
          <Route exact path={["/", "/login"]} component={Login} />
          {/* <Redirect from="/" to="/login" /> */}
        </Switch>
      </AdminLayout>
    </Router>
  );
}

export default App;

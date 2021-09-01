import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Overview from './pages/Overview/Overview';
import Login from './pages/Login/Login';
import Forgot from './pages/Login/Forgot';
import Reset from './pages/Login/Reset';
import Specialization from "./pages/specialization/Specialization";
import SubSpecialization from "./pages/specialization/SubSpecializationContent";
import AdvisoryBoardContent from "./pages/specialization/AdvisoryBoardContent"
import Topics from './pages/Topics/Topics';
import Categories from './pages/Category/Categories';
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
import {  useSelector } from "react-redux";

function App() {
  
  const { user } = useSelector(state => {
    return state.auth;
  });
  
  return (
    <Router>
      <AdminLayout>
        <Switch>
        {/* <Route path="/" onEnter={onUserNavigate} onChange={onUserNavigate}> */}
          <PrivateRoute path="/data" exact component={Overview} />
          <PrivateRoute path="/categories" exact component={Categories} />
          <PrivateRoute path="/topics" exact component={Topics} />
          <PrivateRoute path="/specializations" exact component={Specialization} />
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
          <Route path="/login"  component={Login} />
          {/* </Route> */}
          <Redirect from="/" to="/login" />
        </Switch>
      </AdminLayout>
    </Router>
  );
}

export default App;

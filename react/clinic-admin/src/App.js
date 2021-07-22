import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Overview from './pages/Overview/Overview';
import Login from './pages/Login/Login';
import Specialization from "./pages/specialization/Specialization";
import SubSpecialization from "./pages/specialization/SubSpecializationContent";
import Topics from './pages/Topics/Topics';
import Categories from './pages/Category/Categories';
import Feedback from './pages/Feedback/Feedback';
import Users from './pages/Users/Users';
import Settings from './pages/Settings/Settings';
import Policy from './pages/Settings/Policy';
import Terms from './pages/Settings/Terms';
import About from './pages/Settings/About';
import Contact from './pages/Settings/Contact';
import UserDetails from './pages/Users/UserDetails';
import Ads from './pages/Ads/Ads';
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
          <PrivateRoute path="/data" exact component={Overview} />
          <PrivateRoute path="/data/Categories" exact component={Categories} />
          <PrivateRoute path="/data/topics" exact component={Topics} />
          <PrivateRoute path="/data/Specializations" exact component={Specialization} />
          <PrivateRoute path="/data/SubSpecialization/:specId" exact component={SubSpecialization} />
          <PrivateRoute path="/data/Feedback" exact component={Feedback} />
          <PrivateRoute path="/data/Users" exact component={Users} />
          <PrivateRoute path="/data/Policy" exact component={Policy} />
          <PrivateRoute path="/data/About" exact component={About} />
          <PrivateRoute path="/data/Contact" exact component={Contact} />
          <PrivateRoute path="/data/Ads" exact component={Ads} />
          <PrivateRoute path="/data/Terms" exact component={Terms} />
          <PrivateRoute path="/data/UserDetails/:emailId" exact component={UserDetails} />
          <Route path="/login" component={Login} />
          <Redirect from="/" to="/login" />
        </Switch>
      </AdminLayout>
    </Router>
  );
}

export default App;

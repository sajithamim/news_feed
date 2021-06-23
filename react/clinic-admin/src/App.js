import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Overview from './pages/Overview';
// import { Reports, ReportsOne, ReportsTwo, ReportsThree } from './pages/Reports';
// import Team from './pages/Team';
// import Specialization from './pages/specialization/Specialization';
// import Sidebar from './components/Sidebar/Sidebar';
import Topics from './pages/Topics/Topics';
import AdminLayout from "./components/Layout/AdminLayout";

function App() {
  return (
    <Router>
      <AdminLayout>
        <Switch>
          <Route path="/data" exact component={Overview} />
          {/* <Route path='/reports' exact component={Reports} /> */}
          <Route path="/data/topics" exact component={Topics} />
          {/* <Route path='/data/Specializations' exact component={Specialization} /> */}
          {/* <Route path='/reports/reports2' exact component={ReportsTwo} /> */}
          {/* <Route path='/reports/reports3' exact component={ReportsThree} /> */}
          {/* <Route path='/team' exact component={Team} /> */}
          <Redirect from="/" to="/data" />
        </Switch>
      </AdminLayout>
    </Router>
  );
}

export default App;

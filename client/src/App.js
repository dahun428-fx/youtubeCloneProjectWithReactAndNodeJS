import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPageHOC';
import LoginPage from './components/views/LandingPage/LoginPage/LoginPageHOC';
import RegisterPage from './components/views/LandingPage/RegisterPage/RegisterPageHOC';
import Auth from './hoc/auth';
import VideoUploadPage from './components/views/VideoUploadPage/VideoUploadPageHOC';
import NavBar from './components/views/LandingPage/NavBar/NavBarHOC';
import VideoDetailPage from './components/views/VideoDetailPage/VideoDetailPageHOC';
import SubscriptionPage from './components/views/SubscriptionPage/SubscriptionPageHOC';

function App() {
  return (
    <Router>
      <NavBar />
      <div style={{ paddingTop:'75px', minHeight: 'calc(100vh - 80px)'}}>
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, null)} />
        <Route exact path="/login" component={Auth(LoginPage, false)} />
        <Route exact path="/register" component={Auth(RegisterPage, false)} />
        <Route exact path="/video/upload" component={Auth(VideoUploadPage, true)}/>
        <Route exact path="/video/:videoId" component={Auth(VideoDetailPage, null)}/>
        <Route exact path="/subscription" component={Auth(SubscriptionPage, true)}/>
      </Switch>
      </div>
    </Router>
  );
}

export default App;

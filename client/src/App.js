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
import FooterPage from './components/views/FooterPage/FooterPage';
import VideoModifyPage from './components/views/VideoModifyPage/VideoModifyPageHOC';
import SideMenu from './components/views/LandingPage/NavBar/Sections/SideMenu';
import MyVideoPage from './components/views/MyVideoPage/MyVideoPageHOC';
import { Layout } from 'antd';
const { Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <NavBar />
          <SideMenu Collapse={false} />
        <Layout  style={{backgroundColor : 'white'}}>
          <div style={{ paddingTop:'75px', minHeight: 'calc(100vh - 80px)'}}>
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
            <Route exact path="/video/upload" component={Auth(VideoUploadPage, true)}/>
            <Route exact path="/video/modify/:videoId" component={Auth(VideoModifyPage, true)}/>
            <Route exact path="/video/:videoId" component={Auth(VideoDetailPage, null)}/>
            <Route exact path="/subscription" component={Auth(SubscriptionPage, true)}/>
            <Route exact path="/my/video" component={Auth(MyVideoPage, true)}/>
          </Switch>
          </div>
          <Footer>
            <FooterPage />
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;

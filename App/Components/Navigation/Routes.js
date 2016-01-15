import Dashboard from '../Routes/Dashboard';
import BuildsScreen from '../Routes/BuildsScreen';
import ReposScreen from '../Routes/ReposScreen';
import OAuthView from '../Routes/OAuthView';
import LatestProRepos from '../Routes/LatestProRepos';

export default {

  Dashboard() {
    return {
      id: 'dashboard-view',
      title: 'Dashboard',
      component: Dashboard,
    };
  },

  OAuth(props) {
    return {
      id: 'oauth-view',
      title: 'Authentication',
      component: OAuthView,
      passProps: props
    };
  },

  LatestPro(props) {
    return {
      id: 'latest-pro-view',
      title: 'Latest Builds',
      component: LatestProRepos,
      passProps: props
    };
  },

  Builds() {
    return {
      id: 'builds-view',
      title: 'Builds',
      component: BuildsScreen,
    };
  },

  Repos(props) {
    return {
      id: 'repos-view',
      title: 'Repositories',
      component: ReposScreen,
      passProps: props
    };
  }

};

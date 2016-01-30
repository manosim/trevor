import Dashboard from '../Routes/Dashboard';
import BuildScreen from '../Routes/BuildScreen';
import BuildsScreen from '../Routes/BuildsScreen';
import LatestProRepos from '../Routes/LatestProRepos';
import LogView from '../Routes/LogView';
import OAuthView from '../Routes/OAuthView';
import ReposScreen from '../Routes/ReposScreen';
import SearchPublic from '../Routes/SearchPublic';

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

  SearchPublic(props) {
    return {
      id: 'search-public-view',
      title: 'Search Travis for Open Source',
      component: SearchPublic,
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

  Repos(props) {
    return {
      id: 'repos-view',
      title: 'Repositories',
      component: ReposScreen,
      passProps: props
    };
  },

  Builds(repoName, props) {
    return {
      id: 'builds-view',
      title: 'Builds - ' + repoName,
      component: BuildsScreen,
      passProps: props
    };
  },

  Build(id, props) {
    return {
      id: 'build-view',
      title: 'Build #' + id,
      component: BuildScreen,
      passProps: props
    };
  },

  Log(props) {
    return {
      id: 'log-view',
      title: 'Log Details',
      component: LogView,
      passProps: props
    };
  },
};

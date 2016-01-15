import Dashboard from '../Routes/Dashboard';
import BuildsScreen from '../Routes/BuildsScreen';
import ReposScreen from '../Routes/ReposScreen';

export default {

  Dashboard() {
    return {
      id: 'dashboard-view',
      title: 'Dashboard',
      component: Dashboard,
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

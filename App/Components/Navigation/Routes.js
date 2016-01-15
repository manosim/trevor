import Dashboard from '../Routes/Dashboard';
import BuildsScreen from '../Routes/BuildsScreen';

export default {

  Dashboard: {
    id: 'dashboard-view',
    title: 'Dashboard',
    component: Dashboard,
  },

  Builds: {
    id: 'builds-view',
    title: 'Builds',
    component: BuildsScreen,
  },

};

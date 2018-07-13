import { AppRegistry, Dimensions } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
// import App from './App';
//Components
import HomeComponent from './src/drawers/HomeComponent';
import InfoComponent from './src/drawers/InfoComponent';
import SettingsComponent from './src/drawers/SettingsComponent';
import CloudComponent from './src/drawers/CloudComponent';

//Screen size
var {height, width} = Dimensions.get('window');

let routeConfigs = {
    'Home': {
        path: '/',
        screen: HomeComponent,
    },
    'Info': {
        path: '/info',
        screen: InfoComponent,
    },
    'Settings': {
        screen: SettingsComponent,
    },
    'Cloud': {
        screen: CloudComponent,
    },
};
let drawerNavigatorConfig = {
    initialRouteName: 'Home',
    drawerWidth: width / 2,
    drawerPosition: 'left',
    // drawerOpenRoute: 'DrawerOpen',
    // drawerCloseRoute: 'DrawerClose',
    // drawerToggleRoute: 'DrawerToggle',
    // drawerBackgroundColor: 'orange',
    contentOptions: {
        activeTintColor: 'red',
    },
    order: ["Info", "Settings", "Cloud", "Home"],
};
const App = DrawerNavigator(routeConfigs, drawerNavigatorConfig);
export {App};

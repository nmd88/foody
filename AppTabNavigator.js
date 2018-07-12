import { AppRegistry } from 'react-native';
import { TabNavigator } from 'react-navigation';

import HomeComponent from './src/tabs/HomeComponent';
import InfoComponent from './src/tabs/InfoComponent';
import SettingsComponent from './src/tabs/SettingsComponent';
import CloudComponent from './src/tabs/CloudComponent';

let routeConfigs = {
    'Home': {
        screen: HomeComponent,
    },
    'Info': {
        screen: InfoComponent,
    },
    'Settings': {
        screen: SettingsComponent,
    },
    'Cloud': {
        screen: CloudComponent,
    },
};
let tabNavigatorConfig = {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
        showIcon: true,
        activeTintColor: 'blue',
        labelStyle: {
            fontSize: 13,
        },
        style: {
            backgroundColor: 'lightgray',
            padding: -10
        },
        // showLabel: false
    },
    order: ["Settings", "Home", "Cloud", "Info"],
};
const App = TabNavigator(routeConfigs, tabNavigatorConfig);

export {App};

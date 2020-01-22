import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
    createStackNavigator({
        Main:{
            screen : Main,
            navigationOptions:{
                title: "This is the title M8",
            }
        },
        Profile
    })
);

export default Routes;



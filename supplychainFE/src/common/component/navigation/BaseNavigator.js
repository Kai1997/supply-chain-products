import React from 'react';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'

import Home from "../../../components/home/home";
import Contact from "../../../components/contact/contact";
import Account from "../../../components/account/account";

import Settings_Activity from '../../../screens/Settings_Activity';
import Details_Activity from '../../../screens/Details_Activity';
import Profile_Activity from '../../../screens/Profile_Activity';


const HomeTab = createStackNavigator(
  {
    Home: Home ,
    Details: Details_Activity ,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#0091EA',
      },
      headerTintColor: '#fff',
      title: 'Home Tab',
     
    },
  }
);

const SettingsTab = createStackNavigator(
  {
    Settings: Settings_Activity ,
    Details: Details_Activity ,
    Profile: Profile_Activity ,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#0091EA',
      },
      headerTintColor: '#FFFFFF',
      title: 'Settings Tab',
     
    },
  }
);

const ProfilesTab = createStackNavigator(
  {
    Account: Account ,
    // HomeScreen: HomeScreen,
    // LoginScreen: LoginScreen,
    // RegisterScreen: RegisterScreen,
    // ForgotPasswordScreen: ForgotPasswordScreen,
    // Dashboard: Dashboard,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#0091EA',
      },
      headerTintColor: '#fff',
      title: 'Profiles Tab',
     
    },
  }
);

const BaseNavigator = createBottomTabNavigator(
    {
    Home: HomeTab ,
    Account: ProfilesTab,
    Settings: SettingsTab ,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Home') {
          return (
            <Icon
                    name="home"
                    color={tintColor}
                    size={24}
                />
          );
        } else if (routeName === 'Account') {
            return (
            <Icon
                    name="user"
                    color={tintColor}
                    size={24}
                />
            );
        } else {
          return (
            <Icon
                    name="setting"
                    color={tintColor}
                    size={24}
                />
          );
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: '#FF6F00',
      inactiveTintColor: '#263238',
    },
  }
);

export default createAppContainer(BaseNavigator);

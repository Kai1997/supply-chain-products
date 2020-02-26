import React from 'react';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'

import Home from "../../../screens/home/home";
import Contact from "../../../screens/contact/contact";
import Settings_Activity from '../../../components/Settings_Activity';
import Details_Activity from '../../../components/Details_Activity';
import Profile_Activity from '../../../components/Profile_Activity';
import HomeScreen from '../../../screens/account/HomeScreen';
import LoginScreen from '../../../screens/account/LoginScreen';
import RegisterScreen from '../../../screens/account/RegisterScreen';
import ForgotPasswordScreen from '../../../screens/account/ForgotPasswordScreen';
import Dashboard from '../../../screens/account/Dashboard';

import MenuComponent from '../sidebarMenu/SideBar';

const MenuComponentTab = createStackNavigator(
  {
    MenuComponent: Contact
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#df3237',
      },
      headerTintColor: '#fff'
     
    },
  }
);

const HomeTab = createStackNavigator(
  {
    Home: Home ,
    Details: Details_Activity
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#df3237',
      },
      headerTintColor: '#fff',
      title: 'Home',
     
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
        backgroundColor: '#df3237',
      },
      headerTintColor: '#FFFFFF'
      // title: 'Settings',
     
    },
  }
);

const ProfilesTab = createStackNavigator(
  {
    HomeScreen: HomeScreen,
    LoginScreen: LoginScreen,
    RegisterScreen: RegisterScreen,
    ForgotPasswordScreen: ForgotPasswordScreen,
    Dashboard: Dashboard,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#df3237',
      },
      headerTintColor: '#fff',
      tabBarVisible:false,
      // title: 'Account',
     
    },
  }
);

const BaseNavigator = createBottomTabNavigator(
    {
    Home: HomeTab ,
    Account: ProfilesTab,
    Promotion: SettingsTab ,
    Me: MenuComponentTab,
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
        } else if (routeName === 'Menu') {
          return (
          <Icon
                  name="book"
                  color={tintColor}
                  size={24}
              />
          );
      } 
        else {
          return (
            <Icon
                    name="info"
                    color={tintColor}
                    size={24}
                />
          );
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: '#ff2600',
      inactiveTintColor: '#263238',
    },
  }
);

export default createAppContainer(BaseNavigator);

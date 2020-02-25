import React from "react";
import {  createAppContainer } from "react-navigation";
import store from "./src/store/store";
import { Provider } from "react-redux";

import { createStackNavigator } from 'react-navigation-stack'

import Home from "./src/components/home/home";
// import About from "./app/scenes/About";
// import LoginScreen from "./app/scenes/Login";

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
  // About: {
  //   screen: About
  // },
  // Login: { screen: LoginScreen },
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

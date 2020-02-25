import React from "react";
import store from "./src/store/store";
import { Provider } from "react-redux";
import Home from "./src/components/home/home";
import BaseNavigator from "./src/common/component/navigation/BaseNavigator";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BaseNavigator />
      </Provider>
    );
  }
}

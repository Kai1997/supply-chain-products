import React from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { withNavigation } from "react-navigation";

class MenuIcon extends React.Component {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          this.props.navigation.navigate("Menu");
        }}
      >
        <Icon
          name="bars"
          type="font-awesome"
          color="#eee"
          underlayColor="#e6e7e9"
          iconStyle={{ marginRight: 10 }}
        />
      </TouchableOpacity>
    );
  }
}

export default withNavigation(MenuIcon);

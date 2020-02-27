import React, {memo} from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { withNavigation } from "react-navigation";

class IconCart extends React.Component {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style ={{marginLeft: 10}}
        onPress={() => {
          alert("cart");
        }}
      >
        <Icon
          name="cart-arrow-down"
          type="font-awesome"
          color="#eee"
          underlayColor="#e6e7e9"
          iconStyle={{ marginRight: 10 }}
        />
      </TouchableOpacity>
    );
  }
}
export default withNavigation(memo(IconCart));
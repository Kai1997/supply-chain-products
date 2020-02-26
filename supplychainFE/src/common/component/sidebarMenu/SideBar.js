import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  ScrollView
} from "react-native";

import { List, ListItem, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { withNavigation, NavigationActions } from "react-navigation";

class MenuComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  logout = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Home" })]
    });

    this.props.dispatch({
      type: "LOGOUT"
    });

    this.props.navigation.dispatch(resetAction);
  }

  _pressRow(category) {
    this.props.navigation.navigate("ListBusinesses", category);
  }

  goHome() {
    this.props.navigation.navigate("Home");
  }

  menuItems = [
    {
      title: "Giới thiệu",
      navigateTo: "About",
      icon: {
        name: "info-circle",
        size: 30,
        color: "#4c85bd"
      }
    },
    {
      title: "Kết nối cung cầu",
      navigateTo: "PostNeed",
      icon: {
        name: "plus",
        size: 30,
        color: "green"
      }
    },
    {
      title: 'Tin khuyến mãi',
      navigateTo: 'ListPromotions',
      icon: {
        name: 'star',
        size: 30,
        color: 'yellow'
      }
    }
  ];

  render() {
    let logo = require("../../../assert/imgs/logo.png");

    return (
      <View style={styles.sideMenu}>
        <TouchableHighlight
          underlayColor="rgba(0,0,0,0)"
          onPress={this.goHome.bind(this)}
        >
          <View style={styles.header}>
            <Image source={logo} style={styles.appLogo} />
          </View>
        </TouchableHighlight>
        <ScrollView style={styles.scrollContainer}>
          <List containerStyle={styles.menuContainer}>
            {this.menuItems.map((item, index) => {
              return (
                <ListItem
                  key={index}
                  onPress={() => {
                    this.props.navigation.navigate(item.navigateTo);
                  }}
                  title={item.title}
                  leftIcon={
                    <View style={styles.listItemIcon}>
                      <Icon
                        name={item.icon.name}
                        size={item.icon.size}
                        color={item.icon.color}
                        type="font-awesome"
                      />
                    </View>
                  }
                />
              );
            })}
            {!this.props.auth.isAuthenticated && (
              <ListItem
                onPress={() => {
                  this.props.navigation.navigate("Login");
                }}
                title="Đăng Nhập"
                leftIcon={
                  <View style={styles.listItemIcon}>
                    <Icon
                      name={"sign-in"}
                      size={25}
                      color="green"
                      type="font-awesome"
                    />
                  </View>
                }
              />
            )}

            {this.props.auth.isAuthenticated && (
              <View>
                <View style={styles.categoryHeading}>
                  <Text style={{ fontWeight: "bold" }}>
                    Tài khoản: {this.props.auth.user.email}
                  </Text>
                </View>
                <ListItem
                  onPress={() => {
                    this.props.navigation.navigate("MyNeeds");
                  }}
                  title="Yêu cầu đã đăng"
                  leftIcon={
                    <View style={styles.listItemIcon}>
                      <Icon
                        name={"star"}
                        size={25}
                        color="#f283a5"
                        type="font-awesome"
                      />
                    </View>
                  }
                />
                <ListItem
                  onPress={this.logout}
                  title="Đăng xuất"
                  leftIcon={
                    <View style={styles.listItemIcon}>
                      <Icon
                        name={"sign-out"}
                        size={25}
                        color="#ff0000"
                        type="font-awesome"
                      />
                    </View>
                  }
                />
              </View>
            )}

            <View style={styles.categoryHeading}>
              <Text style={{ fontWeight: "bold" }}>DANH MỤC DOANH NGHIỆP</Text>
            </View>
            {this.props.categories.map((category, i) => {
              return (
                <ListItem
                  roundAvatar
                  leftIcon={
                    <View style={styles.listItemIcon}>
                    
                    </View>
                  }
                  onPress={() => this._pressRow(category)}
                  key={i}
                  title={category.name}
                />
              );
            })}
          </List>
        </ScrollView>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  categoryHeading: {
    padding: 15
  },
  sideMenu: {
    flex: 1,
    backgroundColor: "#ededed",
    flexDirection: "column"
  },
  listItemIcon: {
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    display: "flex",
    backgroundColor: "#bdd9e7",
    flexDirection: "column",
    alignItems: "center",
    height: 100,
    position: "relative"
  },
  appLogo: {
    display: "flex",
    height: 90,
    width: null,
    position: "absolute",
    top: 5,
    bottom: 5,
    left: 5,
    right: 5
  },
  menuContainer: {
    marginTop: 0,
    marginBottom: 20,
    backgroundColor: "#fff"
  },
  scrollContainer: {
    backgroundColor: "#fff",
    padding: 0
  }
});

MenuComponent.defaultProps = {
  categories: [],
  auth: {
    isAuthenticated: false
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    categories: state.categories
  };
};
const mapDispatchToProps = (dispatch) => {
	return {
	}
}
export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(MenuComponent));

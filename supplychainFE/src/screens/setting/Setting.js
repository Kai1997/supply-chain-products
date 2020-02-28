import React, { Component } from "react";
import { ListItem, Icon } from "react-native-elements";
import {
	StyleSheet,
	Text,
  View,
  TouchableOpacity,
  Modal
} from "react-native";

import { connect } from 'react-redux';
import { withNavigation, NavigationActions } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";
import IconCart from '../../components/IconCart'
class Setting extends Component {
	static navigationOptions = ({ navigation }) => {
		const { state, setParams } = navigation;
		return {
			drawerLabel: "Setting",
			title: "Tài khoản",
			headerStyle: styles.headerStyle,
			headerTitleStyle: styles.headerTitleStyle,
			headerTintColor: "white",
      headerRight: ()=> <IconCart />,
		};
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
            list1 : [
                {
                    title: 'Sản phẩm đã xem',
                    icon: 'bookmark-border'
                  },
                  {
                    title: 'Sản phẩm yêu thích',
                    icon: 'favorite-border'
                  },
                  {
                    title: 'Sản phẩm đã mua',
                    icon: 'add-shopping-cart'
                  }
              ],
            list2 : [
                {
                    title: 'Hướng dẫn sử dụng',
                    icon: 'details'
                  },
                  {
                    title: 'Điều khoản',
                    icon: 'description'
                  },
                  {
                    title: 'Trợ giúp',
                    icon: 'announcement'
                  },
                  {
                    title: 'Phản hồi',
                    icon: 'compare-arrows'
                  }
            ],
            list3 : [
                {
                    title: 'Cài đặt ',
                    icon: 'perm-data-setting'
                  },
                  {
                    title: 'Thông tin',
                    icon: 'perm-device-information'
                  }
                 
              ],
              modalVisible: false,
			

		};
	}

	componentDidMount() {

  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
	render() {
		return (
			<View style={styles.settingContainer}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
                <ScrollView>
                <View>
                        <Text></Text>
                        <Text></Text>
                    <ListItem
                            title="Dang nhap"
                            leftIcon={{ name: 'account-circle' }}
                            bottomDivider
                            chevron
                            onPress ={() => {this.props.navigation.navigate('HomeScreen')}}
                        />
                    </View>
                    <View>
                        <Text></Text>
                        {
                        this.state.list1.map((item, i) => (
                        <ListItem
                            key={i}
                            title={item.title}
                            leftIcon={{ name: item.icon }}
                            bottomDivider
                            chevron
                            onPress ={() => {alert(`${item.title}`)}}
                            badge={{ value: 3, textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 } }}
                        />
                        ))
                    }
                    </View>
                    <View>
                        <Text></Text>
                        {
                            this.state.list2.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.title}
                                leftIcon={{ name: item.icon }}
                                bottomDivider
                                chevron
                                onPress ={() => {alert(`${item.title}`)}}
                            />
                        ))
                    }
                    </View>
                    <View>
                        <Text></Text>
                        {
                            this.state.list3.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.title}
                                leftIcon={{ name: item.icon }}
                                bottomDivider
                                chevron
                                onPress={() => {
                                  this.setModalVisible(true);
                                }}
                            />
                        ))
                    }
                    </View>
                </ScrollView>
			</View>

		)
	}
}

var styles = StyleSheet.create({
	settingContainer: {
		marginBottom: 20
	},
	headerStyle: {
		backgroundColor: "#df3237",
		elevation: 0,
		shadowOpacity: 0
	},
	headerTitleStyle: {
		color: "#eee",
		alignSelf: 'center',
		textAlign: 'center',
	}
});

const mapStateToProps = (state) => {
	return {
		
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	}
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Setting));
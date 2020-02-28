import React, { Component } from "react";
import { List, ListItem, SearchBar } from "react-native-elements";
import {
	StyleSheet,
	Text,
	View,
	Button,
	FlatList,
	TouchableHighlight,
	Image
} from "react-native";

import { connect } from 'react-redux';
import { getInfoProductAction } from '../../actions/homeActions/actionCreators';
import { withNavigation, NavigationActions } from "react-navigation";
import HomeScreen from '../../screens/account/HomeScreen';
class Chat extends React.Component {
	static navigationOptions = ({ navigation }) => {
		const { state, setParams } = navigation;
		return {
			drawerLabel: "Chat",
			title: "Trò chuyện",
			headerStyle: styles.headerStyle,
			headerTitleStyle: styles.headerTitleStyle,
			headerTintColor: "white"
			// headerRight: <MenuIcon />
		};
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
		};
	}

	componentDidMount() {
		
	}
	render() {
		console.log("asdasd",!this.props.isAuthenticated);
		if (!this.props.isAuthenticated) {
			return (
				<HomeScreen />
			)
		} else {
			return (
				<View style={styles.contactContainer}>
					<View ><Text >chat</Text></View>
				</View>
	
			)
		}
		
	}
}

var styles = StyleSheet.create({
	contactContainer: {
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
	console.log(state)
	return {
		isAuthenticated: state.account.status.isAuthenticated
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	}
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Chat));
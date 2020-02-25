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

class Account extends React.Component {
	static navigationOptions = ({ navigation }) => {
		const { state, setParams } = navigation;
		return {
			drawerLabel: "Account",
			title: "Account",
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
		return (
			 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

         		 <Text>Profile Activity Screen</Text>

        	</View>

		)
	}
}

var styles = StyleSheet.create({
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

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Account));
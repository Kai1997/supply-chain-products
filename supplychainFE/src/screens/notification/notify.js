import React, { Component } from "react";
import {Icon } from "react-native-elements";
import {
	StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { connect } from 'react-redux';
import { withNavigation, NavigationActions } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";
import IconCart from '../../components/IconCart'

class Nofity extends Component {
	static navigationOptions = ({ navigation }) => {
		const { state, setParams } = navigation;
		return {
			drawerLabel: "Thông báo",
			title: "Thông báo",
			headerStyle: styles.headerStyle,
			headerTitleStyle: styles.headerTitleStyle,
			headerTintColor: "white",
			headerRight: ()=> <IconCart />,
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
			<View style={styles.settingContainer}>
                <ScrollView>
                
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

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Nofity));
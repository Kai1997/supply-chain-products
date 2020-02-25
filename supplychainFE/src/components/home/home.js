import React, { Component } from "react";
import { List, ListItem,  SearchBar } from "react-native-elements";
import {
	StyleSheet,
	Text,
	View,
	Button,
	FlatList,
	TouchableHighlight,
	TouchableOpacity,
	Image
} from "react-native";

import Toast from "react-native-root-toast";
import { connect } from 'react-redux';
import { getInfoProductAction } from '../../actions/homeActions/actionCreators';
import { withNavigation, NavigationActions } from "react-navigation";
// import { MenuIcon } from "../../common/component/navigation/MenuIcon";

class Home extends React.Component {
	static navigationOptions = ({ navigation }) => {
		const { state, setParams } = navigation;
		return {
			drawerLabel: "Home",
			title: "Home",
			headerStyle: styles.headerStyle,
			headerTitleStyle: styles.headerTitleStyle,
			headerTintColor: "white"
			// headerLeft: <MenuIcon />
		};
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
		};
	}

	componentDidMount() {
	}
	_getProductInfo = () => {
		this.props.getInfoProduct();
	}
	render() {
		const { infoProduct } = this.props;
		console.log("home: ", infoProduct);
		let renderInfo;
		if (infoProduct && infoProduct.data) {
			if (infoProduct.status) {
				renderInfo = infoProduct["data"].map((value, key) => {
					return (
						<Text key={key}>
							<Text>upc: {value.upc}{"\n"}</Text>
							<Text>productId: {value.productId}{"\n"}</Text>
							<Text>productId: {value.productId}{"\n"}</Text>
							<Text>productPrice: {value.productPrice}{"\n"}</Text>
						</Text>
					);
				})
			} else {
				renderInfo = <Text>{infoProduct["data"]}</Text>;
			}

		}
		return (
			<View style={styles.MainContainer}>
				{/* <View ><Text >Product Info</Text></View>
				<View >
					{renderInfo}
				</View>
				<Button
					onPress={this._getProductInfo}
					title="Red button!"
					color="red"
				/> */}
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => this.props.navigation.navigate('Settings')}>
					<Text style={styles.text}>Go to settngs Tab</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button}
					onPress={() => this.props.navigation.navigate('Profile')}>

					<Text style={styles.text}>Goto Profile Screen</Text>
				</TouchableOpacity>
				</View>
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
	},
	MainContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f5fcff',
		padding: 11

	},

	button: {
		alignItems: 'center',
		backgroundColor: '#43A047',
		padding: 12,
		width: 280,
		marginTop: 12,
	},

	text: {

		color: '#fff'
	}
});

const mapStateToProps = (state) => {
	return {
		infoProduct: state.home.infoProduct
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getInfoProduct: (upc) => dispatch(getInfoProductAction("upc12345"))
	}
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Home));
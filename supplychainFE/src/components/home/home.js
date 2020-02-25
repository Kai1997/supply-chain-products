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

import Toast from "react-native-root-toast";
import { connect } from 'react-redux';
import { getInfoProductAction } from '../../actions/homeActions/actionCreators';
import { withNavigation, NavigationActions } from "react-navigation";

class Home extends React.Component {
	static navigationOptions = ({ navigation }) => {
		const { state, setParams } = navigation;
		return {
			drawerLabel: "Home",
			title: "Home",
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
			<View style={styles.homeContainer}>
				<View ><Text >Product Info</Text></View>
				<View >
					{renderInfo}
				</View>
				<Button
					onPress={this._getProductInfo}
					title="Red button!"
					color="red"
				/>
			</View>

		)
	}
}

var styles = StyleSheet.create({
	homeContainer: {
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
		infoProduct: state.home.infoProduct
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getInfoProduct: (upc) => dispatch(getInfoProductAction("upc12345"))
	}
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Home));
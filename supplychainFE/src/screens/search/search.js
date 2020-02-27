import React, { Component } from "react";
import { List, ListItem, SearchBar } from "react-native-elements";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Button
} from "react-native";

import { connect } from 'react-redux';
import { withNavigation, NavigationActions } from "react-navigation";
class Search extends React.Component {
	static navigationOptions = ({ navigation }) => {
		const { state, setParams } = navigation;
		return {
			// drawerLabel: "Search",
			// title: "Contact",
			headerStyle: styles.headerStyle,
			headerTitleStyle: styles.headerTitleStyle,
			headerTintColor: "white"
			// headerLeft: ()=>(
			// 	<SearchBar
			// 		placeholder="Type Here..."
			// 		onChangeText={navigation.updateSearch}
			// 		value={navigation.state.search}
			// 	/>
			// )
		};
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
			search: ''
		};
	}

	componentDidMount() {
		this.setState({ search: '' });
	}
	updateSearch = search => {
		this.setState({ search });
	  };
	render() {
		return (
			<View style={styles.searchContainer}>
				<SearchBar
					placeholder="Tim kim..."
					onChangeText={this.updateSearch}
					value={this.state.search}
					lightTheme = {true}
					cancelButtonTitle="Cancel"
					inputStyle={{backgroundColor: 'white'}}
					containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
					placeholderTextColor={'#g5g5g5'}
					/>
				<View style ={{padding: 4}}>
					<ScrollView  horizontal={true} style={styles.container}>  
						<View style={[{ width: 220,height: 70,padding: 10 }]}>  
							<Button  
								onPress={() => {this.updateSearch("Danh mục")}}  
								title="Danh mục"  
								color="#bee6e1"  
							/>  
						</View>  
						<View style={[{ width: 220,height: 70,padding: 10 }]}>  
							<Button  
								onPress={() => {this.updateSearch("Sản phẩm")}}  
								title="Sản phẩm"  
								color="#bee6e1"  
							/>  
						</View>  
						<View style={[{ width: 220,height: 70,padding: 10 }]}>  
							<Button  
								onPress={() => {this.updateSearch("Danh nghiệp")}}  
								title="Danh nghiệp"  
								color="#bee6e1"  
							/>  
						</View>  
						<View style={[{ width: 220,height: 70,padding: 10 }]}>  
							<Button  
								onPress={() => {this.updateSearch("Xu hướng")}}  
								title="Xu hướng"  
								color="#bee6e1"  
							/>  
						</View>  
					</ScrollView> 
				</View>
				<Text style ={{paddingLeft: 10,color: 'blue'}}>Nỗi bật</Text>
				<Text>{this.state.search}</Text>	
			</View>

		)
	}
}

var styles = StyleSheet.create({
	searchContainer: {
		marginBottom: 20,
		marginTop: '10%'
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

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Search));
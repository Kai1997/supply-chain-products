import React, { Component } from "react";
import {Icon } from "react-native-elements";
import {
	StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
	View
	
} from "react-native";

import { connect } from 'react-redux';
import { withNavigation, NavigationActions } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";
import IconCart from '../../components/IconCart'
import Loading from '../../components/Loading'
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
			loading: true,
		};
	}

	componentDidMount() {
        
	}
	render() {
		if ( this.state.loading) {
			return (
				<Loading />
			)
		} else {
		return (
			<View style={styles.settingContainer}>
                <ScrollView>
                
                </ScrollView>
                <View>
                <TouchableHighlight style={styles.addButton}
                    underlayColor='#ff7043' onPress={()=>{console.log('pressed')}}>
                    <Text style={{fontSize: 50, color: 'white'}}>+</Text>
                </TouchableHighlight>
                </View>
			</View>

		)
		}
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
    },
    addButton: {
        backgroundColor: '#ff5722',
        borderColor: '#ff5722',
        borderWidth: 1,
        height: 50,
        width: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        // bottom: 200,
		right:20,
		top: '95%',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 0
        }
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
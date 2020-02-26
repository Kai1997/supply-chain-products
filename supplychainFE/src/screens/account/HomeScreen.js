import React, { memo } from 'react';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Paragraph from '../../components/Paragraph';

class HomeScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		const { state, setParams } = navigation;
		return {
			// tabBarVisible:true,
			hideTabBar: true ,
			// drawerLabel: "Account",
			// title: "Account",
			// headerTintColor: "white"
			// headerRight: <MenuIcon />
			
		};
	};
	render() {
		return(
			<Background>
			<Logo />
			<Header>Login</Header>

			<Paragraph>
			The easiest way to start with your amazing application.
			</Paragraph>
			<Button mode="contained" onPress={() => this.props.navigation.navigate('LoginScreen')}>
			Login
			</Button>
			<Button
			mode="outlined"
			onPress={() => this.props.navigation.navigate('RegisterScreen')}
			>
			Sign Up
			</Button>
		</Background>
		);
	}
}

export default memo(HomeScreen);

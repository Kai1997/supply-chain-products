import React, { memo } from 'react';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Paragraph from '../../components/Paragraph';
import Button from '../../components/Button';
class Dashboard extends React.Component {
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
    render() {
      return(
          	<Background>
			<Logo />
			<Header>Let’s start</Header>
			<Paragraph>
				Your amazing app starts here. Open you favourite code editor and start
				editing this project.
			</Paragraph>
			<Button mode="outlined" onPress={() => this.props.navigation.navigate('HomeScreen')}>
				Logout
			</Button>
		</Background>
      );
    }
}

export default memo(Dashboard);

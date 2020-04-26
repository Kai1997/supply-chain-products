import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';
import BottomTab from '../../components/BottomTab';
import BackgroundHeader from '../../components/BackgroundHeader';
import Home from './home';

class MainHome extends React.Component {
    static navigationOptions = ({ navigation }) => {
		const { state, setParams } = navigation;
		return {
			headerShown: false

		};
	};
    render() {
        return (
            <>
              <StatusBar barStyle="dark-content" />
              <View style={styles.container}>
                <BackgroundHeader style={styles.bg} />
                <ScrollView style={styles.scrollView}>
                  <Home />
                </ScrollView>
                {/* <BottomTab /> */}
              </View>
            </>
          );
    }
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F1F2',
  },
  bg: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: 250,
    
  },
  scrollView: {
    flex: 1,
  },
});

export default MainHome;
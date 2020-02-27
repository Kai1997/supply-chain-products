import React from "react";
import { Platform, StatusBar } from "react-native";
import store from "./src/store/store";
import { Provider } from "react-redux";
import BaseNavigator from "./src/common/component/navigation/BaseNavigator";
import AppIntroSlider from 'react-native-app-intro-slider';
import {
  StyleSheet,
  Text,
  View,
  Image
} from "react-native";
import {randomIntro} from './src/common/utilities/utilities'
const styles = StyleSheet.create({
  
  mainapp: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  }
});
const slides = [
  {
    key: 's1',
    title: 'Submit Your Application',
    text: 'We need your basic information for find someone ',
    image: {
      uri:
        'https://imgur.com/7ClQj9M.png',
    },
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#BCF4F5',
  },
  {
    key: 's2',
    title: ' Found match',
    text: 'Good new we Found someone who matching you',
    image: {
      uri:
        'https://imgur.com/BVQ79rh.png',
    },
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#B4EBCA',
  },
  {
    key: 's3',
    title: 'Just Dating ',
    text: 'let hangout and enjoy together with special place and special deal',
    image: {
      uri: 'https://imgur.com/RPI8wie.png',
    },
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#D9F2B4',
  },
  {
    key: 's4',
    title: 'Got new Love',
    text: ' Your not lonly anymore',
    image: {
      uri: 'https://imgur.com/f1GhQo1.png',
    },
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#FFB7C3',
  }
];
export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showRealApp: false
    };
  }
  _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }
  _onDone = () => {
    this.setState({ showRealApp: true });
  }
  _onSkip = () => {
    this.setState({ showRealApp: true });
  };
  render() {
    if (this.state.showRealApp) {
      return (
        <Provider store={store}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <BaseNavigator />
        </Provider>
      );
    } else {
      return <AppIntroSlider
        slides={slides}
        onDone={this._onDone}
        showSkipButton={true}
        onSkip={this._onSkip}
      />;
    }
    
  }
}

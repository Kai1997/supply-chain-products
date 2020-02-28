import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native';

export default class Loading extends React.Component {
  render() {
    return (
        <View style={styles.loader}>
            <ActivityIndicator size="large" color="purple" />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    loader: {
        flex: 1, 
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    }
});

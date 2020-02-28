import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default class Map extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 24, fontWeight: '500', paddingHorizontal: 20 }}>
            Bản đồ hội chợ 
        </Text>
        <MapView style={styles.mapStyle} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width:"100%",
    height: 300,
  },
});

import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Button,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native'
import { Permissions } from 'react-native-unimodules'
import { BarCodeScanner } from 'expo-barcode-scanner'
function BarcodeScanner({ navigation }) {
  const [hasCameraPermission, setCameraPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [animationLineHeight, setAnimationLineHeight] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })
  const [focusLineAnimation, setFocusLineAnimation] = useState(
    new Animated.Value(0),
  )

  useEffect(() => {
    getPermissionsAsync()
    animateLine()
  }, [])
  const animateLine = () => {
    Animated.sequence([
      Animated.timing(focusLineAnimation, {
        toValue: 1,
        duration: 1000,
      }),

      Animated.timing(focusLineAnimation, {
        toValue: 0,
        duration: 1000,
      }),
    ]).start(animateLine)
  }
  const getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    const isPermissionGranted = status === 'granted'
    setCameraPermission(isPermissionGranted)
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    if (data) {
      console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
      navigation.navigate('Product', {upc: data});
    }
  }

  if (hasCameraPermission === null) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Requesting for camera permission</Text>
      </View>
    )
  }
  if (hasCameraPermission === false) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>No access to camera</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.overlay}>
        <View style={styles.unfocusedContainer}></View>

        <View style={styles.middleContainer}>
          <View style={styles.unfocusedContainer}></View>
          <View
            onLayout={e =>
              setAnimationLineHeight({
                x: e.nativeEvent.layout.x,
                y: e.nativeEvent.layout.y,
                height: e.nativeEvent.layout.height,
                width: e.nativeEvent.layout.width,
              })
            }
            style={styles.focusedContainer}>
            {!scanned && (
              <Animated.View
                style={[
                  styles.animationLineStyle,
                  {
                    transform: [
                      {
                        translateY: focusLineAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, animationLineHeight.height],
                        }),
                      },
                    ],
                  },
                ]}
              />
            )}

            {scanned && (
              <TouchableOpacity
                onPress={() => setScanned(false)}
                style={styles.rescanIconContainer}>
                <Image
                  source={require('../../assert/imgs/rescan.png')}
                  style={{ width: 50, height: 50 }}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.unfocusedContainer}></View>
        </View>
        <View style={styles.unfocusedContainer}></View>
      </View>
      {/* {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )} */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  unfocusedContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },

  middleContainer: {
    flexDirection: 'row',
    flex: 1.5,
  },

  focusedContainer: {
    flex: 6,
  },
  animationLineStyle: {
    height: 2,
    width: '100%',
    backgroundColor: 'red',
  },
  rescanIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
BarcodeScanner.navigationOptions = {
  // title: 'Home',
  headerShown: false

  };
export default BarcodeScanner
import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
const W = Dimensions.get('window').width;
/**
 * Create Background Gradient
 */

const BackgroundHeader = ({style}) => {
  return (
    <View
      style={[styles.lineargGradient, style]}
      >
      <View style={styles.line} />
      <View style={[styles.line, {top: 130, left: -150}]} />
      <View style={[styles.line, {top: 160, left: 0}]} />
    </View>
  );
};

export default BackgroundHeader;

const styles = StyleSheet.create({
  lineargGradient: {
    height: (W * 3) / 4,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    backgroundColor :"red"
  },
  line: {
    position: 'absolute',
    width: W,
    top: 100,
    left: -300,
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.1)',
    transform: [
      {
        rotate: '-35deg',
      },
    ],
    borderRadius: 60,
  },
});

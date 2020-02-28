import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";

class HomeImageProduct extends Component {
    render() {
        return (
            <View style={{ height: 130, width: 130, marginLeft: 20, borderWidth: 0.5, borderColor: '#dddddd', marginBottom: 10 }}>
                <View style={{ flex: 2 }}>
                    <Image source={{uri: this.props.imageUri}}
                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                        onPress ={() => {alert(`${this.props.name}`);}}
                    />
                </View>
                <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10, alignItems: 'center' }}>
                    <Text>{this.props.name}</Text>
                </View>
            </View>
        );
    }
}
export default HomeImageProduct;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
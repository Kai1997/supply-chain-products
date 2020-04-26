import React, { Component } from 'react'
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native'
import PropTypes from 'prop-types'

import PhotoButton from '../../components/PhotoButton'

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
      },
      container: {
        flex: 1,
        flexDirection: 'column',
      },
      coverContainer: {
        position: 'relative',
      },
      coverImage: {
        height: Dimensions.get('window').width * (3 / 4),
        width: Dimensions.get('window').width,
      },
      headerContainer: {
        alignItems: 'center',
        backgroundColor: '#FFF',
      },
      scroll: {
        backgroundColor: '#FFF',
        flex: 1,
        marginBottom: 55,
      },
      productRow: {
        margin: 25,
      },
      mainviewStyle: {
        flex: 1,
        flexGrow: 1,
        flexDirection: 'column',
      },
      footer: {
        position: 'absolute',
        flex: 0.1,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#F64A25',
        flexDirection: 'row',
        height: 65,
        alignItems: 'center',
      },
      buttonFooter: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      },
      navigatorButton: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        flex: 1,
      },
      navigatorText: {
        color: '#4CD964',
        fontWeight: 'bold',
        alignItems: 'flex-start',
        justifyContent: 'center',
    
        fontSize: 16,
      },
      borderCenter: {
        height: 55,
        borderWidth: 0.5,
        borderColor: '#FFA890',
      },
      textFooter: {
        color: 'white',
        fontWeight: 'bold',
        alignItems: 'center',
        fontSize: 18,
      },
      priceText: {
        marginBottom: 5,
        letterSpacing: 1,
    
        color: '#000000',
        fontSize: 36,
        fontWeight: '400',
      },
      detailText: {
        marginBottom: 4,
        color: '#000000',
        fontSize: 22,
        fontWeight: '600',
        letterSpacing: 0.5,
      },
      subDetailText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '100',
        lineHeight: 28,
        letterSpacing: 0.5,
      },
      descriptionText: {
        marginBottom: 4,
        color: '#8E8E93',
        fontSize: 16,
        fontWeight: '400',
        letterSpacing: 1,
      },
})

class Product extends Component {
  static propTypes = {
    img: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  }

  static defaultProps = {
    containerStyle: {},
    img:"https://source.unsplash.com/1024x768/?nature",
    detail: "Enjoy true urban living in this spacious one bedroom, one bath home at The Infinity. This full service home is finished with Studio Becker cabinetry, hardwood floors, Bosch and Thermador appliances, in-unit washer/dryer and custom lighting. Premium Secure Undergroud"

  }

  renderDetail = () => {
    return (
      <View>
        <Text style={styles.detailText}>For Sale Property Details</Text>
        <Text style={styles.subDetailText}>{this.props.detail}</Text>
      </View>
    )
  }

  renderDescription = () => {
    return (
      <View>
        <Text style={styles.priceText}>$1,175,000</Text>
        <Text style={styles.descriptionText}>1 Bed, 2 Bath, 1088 soft</Text>
        <Text style={styles.descriptionText}>Condo, 342 Days on Trulia</Text>
        <Text style={styles.descriptionText}>Est. Mortgage $52,604</Text>
      </View>
    )
  }

  renderNavigator = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity style={[styles.navigatorButton, { flex: 2 }]}>
          <Text style={styles.navigatorText}>DIRECTIONS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navigatorButton, { flex: 2 }]}>
          <Text style={styles.navigatorText}>STREET VIEW</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navigatorButton, { flex: 1 }]}>
          <Text style={styles.navigatorText}>MAP</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderContactHeader = () => {
    const { img } = this.props
    return (
      <View style={styles.headerContainer}>
        <View style={styles.coverContainer}>
          <ImageBackground
            source={{
              uri: img,
            }}
            style={styles.coverImage}
          >
            <PhotoButton />
          </ImageBackground>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.mainviewStyle}>
        <ScrollView style={styles.scroll}>
          <View style={[styles.container, this.props.containerStyle]}>
            <View style={styles.cardContainer}>
              {this.renderContactHeader()}
            </View>
          </View>
          <View style={styles.productRow}>{this.renderDescription()}</View>
          <View style={styles.productRow}>{this.renderNavigator()}</View>
          <View style={styles.productRow}>{this.renderDetail()}</View>
        </ScrollView>
      </View>
    )
  }
}

export default Product
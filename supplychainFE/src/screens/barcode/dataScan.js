import React, { Component } from "react";
import { List, ListItem, SearchBar } from "react-native-elements";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import Loading from '../../components/Loading'
import PropTypes from 'prop-types'
// import PhotoButton from '../../components/PhotoButton'
import Timeline from 'react-native-timeline-flatlist';
import { connect } from 'react-redux';
import { getInfoProductAction } from '../../actions/homeActions/actionCreators';
import { withNavigation, NavigationActions } from "react-navigation";
import HomeApi from '../../api/home';

class DataScan extends React.Component {
  static propTypes = {
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  }

  static defaultProps = {
    containerStyle: {},

  }
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      drawerLabel: "Product",
      title: "Sản phẩm",
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
      headerTintColor: "white"
      // headerRight: <MenuIcon />
    };
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      selected: null,
      infoProduct: null
    };
    this.data = [
      {
        time: 'Step 1',
        title: 'Nông dân',
        description:
          'CÔng ty: FARMER',
        lineColor: '#009688',
        imageUrl:
          'https://images.pexels.com/photos/2250394/pexels-photo-2250394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250',
      },
      {
        time: 'Step 2',
        title: 'Nhà sản xuất',
        description:
          'Công ty MANUFACTURER',
        imageUrl:
          'https://images.pexels.com/photos/2250394/pexels-photo-2250394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250',
      },
      {
        time: 'Step 3',
        title: 'Nhà phân phối',
        description:'Công ty DISTRIBUTOR',
      },
      {
        time: 'Step 4',
        title: 'Đơn vị vận chuyển',
        description:'Công ty THIRDPL',
        lineColor: '#009688',
        imageUrl:
          'https://images.pexels.com/photos/2250394/pexels-photo-2250394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250',
      },
      {
        time: 'Step 5',
        title: 'Nhà bán lẻ',
        description:'Cửa hàng RETAILER',
        imageUrl:
          'https://images.pexels.com/photos/2250394/pexels-photo-2250394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250',
      },
    ];
  }
  onEventPress = (data) => {
    this.setState({ selected: data });
  }

  renderSelected = () => {
    if (this.state.selected)
      return (
        <Text style={{ marginTop: 10 }}>
          Selected event: {this.state.selected.title} at{' '}
          {this.state.selected.time}
        </Text>
      );
  }

  renderDetail = (rowData, sectionID, rowID) => {
    let title = <Text style={[styles.title]}>{rowData.title}</Text>;
    var desc = null;
    if (rowData.description && rowData.imageUrl)
      desc = (
        <View style={styles.descriptionContainer}>
          <Image source={{ uri: rowData.imageUrl }} style={styles.image} />
          <Text style={[styles.textDescription]}>{rowData.description}</Text>
        </View>
      );

    return (
      <View style={{ flex: 1 }}>
        {title}
        {desc}
      </View>
    );
  }
  componentDidMount() {
    const { navigation } = this.props;
    const upc = navigation.getParam('upc');
    HomeApi.getInfoProduct(upc).then(res => {
      if (res && res.data && res.data["data"]) {
        this.setState({
          loading: false,
          infoProduct: res.data
        })
      }
    }
    );
  }
  renderDetail = () => {
    return (
      <View>
        <Text style={styles.detailText}>Quy trình cung ứng</Text>
        {/* <Text style={styles.subDetailText}>{this.props.detail}</Text> */}
      </View>
    )
  }

  renderDescription = (name, price, upc) => {
    return (
      <View>
        <Text style={styles.priceText}>{name}</Text>
        <Text style={styles.descriptionText}>{price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " VND"}</Text>
        <Text style={styles.descriptionText}>Mã sản phẩm: {upc}</Text>
        {/* <Text style={styles.descriptionText}>Est. Mortgage $52,604</Text> */}
      </View>
    )
  }


  renderContactHeader = (img) => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.coverContainer}>
          <ImageBackground
            source={{
              uri: img,
            }}
            style={styles.coverImage}
          >
            {/* <PhotoButton /> */}
          </ImageBackground>
        </View>
      </View>
    )
  }
  render() {
    let { infoProduct, loading } = this.state;
    console.log(infoProduct)
    let name, price, image, upc;
    if (infoProduct && infoProduct.status) {
      name = infoProduct.data[0].productNotes;
      price = infoProduct.data[0].productPrice;
      image = infoProduct.data[0].productImg;
      upc = infoProduct.data[0].upc;

    }
    if (loading) {
      return (
        <Loading />
      )
    }
    else if (infoProduct && !infoProduct.status) {
      return (
        <View style={styles.nothing}>
          <Image source={require('../../assert/imgs/opp.png')} style={styles.oop} />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Scan")}
            style={styles.continue}>
            <Text>Quét tiếp</Text>
          </TouchableOpacity>
        </View>)
    } else {
      return (
        <ScrollView style={styles.scroll, styles.mainviewStyle}>
          <View style={[styles.container, this.props.containerStyle]}>
            <View style={styles.cardContainer}>
              {this.renderContactHeader(image)}
            </View>
          </View>
          <View style={styles.productRow}>{this.renderDescription(name, price, upc)}</View>
          {/* <View style={styles.productRow}>{this.renderNavigator()}</View> */}
          <View style={styles.productRow}>{this.renderDetail()}</View>
          <Timeline
            style={styles.list}
            data={this.data}
            circleSize={20}
          circleColor='rgb(45,156,219)'
          lineColor='rgb(45,156,219)'
            timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
            timeStyle={{
              textAlign: 'center',
              backgroundColor: '#ff9797',
              color: 'white',
              padding: 5,
              borderRadius: 13,
            }}
            descriptionStyle={{ color: 'gray' }}
            options={{
              style: { paddingTop: 5 },
            }}
            innerCircle={'icon'}
          />
        </ScrollView>

      )
    }

  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  contactContainer: {
    marginBottom: 20
  },
  headerStyle: {
    backgroundColor: "#df3237",
    elevation: 0,
    shadowOpacity: 0
  },
  headerTitleStyle: {
    color: "#eee",
    alignSelf: 'center',
    textAlign: 'center',
  },
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
  list: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    flexDirection: 'row',
    paddingRight: 50,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textDescription: {
    marginLeft: 10,
    color: 'gray',
  },
  nothing: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 100,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingTop: 10,
    fontSize: 32,
    color: "gray",

  },
  continue: {
    backgroundColor: "#34ebcc",
    padding: 10,
    margin: 10,
    borderRadius: 20,
    color: "white"
  }
});

const mapStateToProps = (state) => {
  return {
    infoProduct: state.home.infoProduct
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInfoProduct: (upc) => dispatch(getInfoProductAction(upc))
  }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(DataScan));
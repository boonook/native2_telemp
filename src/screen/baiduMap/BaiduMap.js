/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {
    Component
} from 'react';

import {
    StyleSheet,
    View,
    TouchableOpacity,
    StatusBar,
    Dimensions,
} from 'react-native';
import{CachedImage}from"react-native-img-cache";

import { MapView, MapTypes, Geolocation, Overlay } from 'react-native-baidu-map';

const {width } = Dimensions.get('window');

class BaiduMap extends Component<Props> {

    state = {
        location: {},
        markers: [
            {
                location: {
                    longitude: 113.960453,
                    latitude: 22.546045
                }
            },
            {
                location: {
                    longitude: 113.961453,
                    latitude: 22.547045
                }
            },
            {
                location: {
                    longitude: 113.962453,
                    latitude: 22.548045
                }
            },
            {
                location: {
                    longitude: 113.963453,
                    latitude: 22.545045
                }
            },
            {
                location: {
                    longitude: 113.964453,
                    latitude: 22.544045
                }
            }
        ],
        latitude:0,
        longitude:0
    };

    getCurrentPosition=()=>{
        Geolocation.getCurrentPosition()
            .then((data) => {
                this.setState({
                    latitude:data.latitude||0,
                    longitude:data.longitude||0,
                });
            });
    }

    componentDidMount() {
       this.getCurrentPosition()
    }

    onMapStatusChangeFinish=(data)=>{
        debugger
    }

    render() {
        return (
            <View style={{flex:1}}>
                <StatusBar  backgroundColor={'#fff'} barStyle="dark-content"/>
                <View style={{flex:1,backgroundColor:'#000',position:'relative'}}>
                    <View style={{position:'absolute',zIndex:999999,bottom:30,right:15}}>
                        <TouchableOpacity onPress={()=>{
                            this.getCurrentPosition()
                        }}>
                            <CachedImage source={require('../../assets/images/positionMap.png')}  style={{width:30,height:30}}/>
                        </TouchableOpacity>
                    </View>
                    <MapView
                        width={width}
                        style={{flex:1}}
                        zoom={18}
                        onMapStatusChangeFinish={()=>{
                            this.onMapStatusChangeFinish
                        }}
                        trafficEnabled={true}
                        zoomControlsVisible={false}
                        mapType={MapTypes.NORMAL}
                        center={{ longitude:this.state.longitude, latitude:this.state.latitude}}
                    >
                        <Overlay.Marker rotate={45} icon={{ uri: 'https://mapopen-website-wiki.cdn.bcebos.com/homePage/images/logox1.png' }} location={{ longitude:this.state.longitude, latitude:this.state.latitude }} />
                    </MapView>
                </View>
            </View>
        );
    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    scrollView: {

    },
    location: {
        padding: 16
    },
    buttonGroup: {
        padding: 16
    },
    button: {
        width: 80
    }
});

export default BaiduMap;

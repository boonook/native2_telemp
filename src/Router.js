import React, {Component} from 'react';
import {StyleSheet, Text,ScrollView,Dimensions,TouchableOpacity } from 'react-native';
import{CachedImage}from"react-native-img-cache";
import {
    createAppContainer
} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from './screen/home/HomeScreen';
import SchoolStyleScreen from './screen/schoolStyle/SchoolStyleScreen';
import OrderFormScreen from './screen/orderForm/OrderFormScreen';
import MyScreen from './screen/my/MyScreen';
import SettingScreen from './screen/setting/SettingScreen';
import LoginScreen from './screen/login/LoginScreen';
import BaiduMap from './screen/baiduMap/BaiduMap';
import MySetting from './screen/my/commont/MySetting';

const {height,width} =  Dimensions.get('window');
const other = {
    BaiduMap:{
        screen:BaiduMap
    },
    MySetting:{
        screen:MySetting
    }
};

const appTabNavigator = createBottomTabNavigator({
    Home:{
        screen:HomeScreen,
        navigationOptions: () => ({
            tabBarLabel: '首页',
            tabBarIcon: ({ focused,tintColor }) => {
                if(focused){
                    return <CachedImage source={require('./assets/images/tab/Tab_icon_home_pre.png')}  style={[styles.tabBarImage]}/>
                }else{
                    return <CachedImage source={require('./assets/images/tab/Tab_icon_home_nor.png')}  style={[styles.tabBarImage]}/>
                }
                // tintColor传递进来的是颜色，选中的颜色,那么图标颜色也要换

            }
        })
    },
    SchoolStyle:{
        screen:SchoolStyleScreen,
        navigationOptions: () => ({
            tabBarLabel: '校园风采',
            tabBarIcon: ({ focused,tintColor }) => {
                if(focused){
                    return <CachedImage source={require('./assets/images/tab/Tab_icon_inform_pre.png')}  style={[styles.tabBarImage]}/>
                }else{
                    return <CachedImage source={require('./assets/images/tab/Tab_icon_inform_nor.png')}  style={[styles.tabBarImage]}/>
                }
            }
        })
    },
    OrderForm:{
        screen:OrderFormScreen,
        navigationOptions: () => ({
            tabBarLabel: '订单',
            tabBarIcon: ({ focused,tintColor }) => {
                if(focused){
                    return <CachedImage source={require('./assets/images/tab/Tab_icon_statistics_pre.png')}  style={[styles.tabBarImage]}/>
                }else{
                    return <CachedImage source={require('./assets/images/tab/Tab_icon_statistics_nor.png')}  style={[styles.tabBarImage]}/>
                }
            }
        })
    },
    my:{
        screen:MyScreen,
        navigationOptions: () => ({
            tabBarLabel: '我的',
            tabBarIcon: ({ focused,tintColor }) => {
                if(focused){
                    return <CachedImage source={require('./assets/images/tab/Tab_icon_mine_pre.png')}  style={[styles.tabBarImage]}/>
                }else{
                    return <CachedImage source={require('./assets/images/tab/Tab_icon_mine_nor.png')}  style={[styles.tabBarImage]}/>
                }
            }
        })
    }
},{
    initialRouteName: 'Home',
        tabBarPosition: 'bottom',
        lazy: false,//懒加载
        swipeEnabled: false,
        tabBarOptions: {
        activeTintColor: '#d71e31',
            style: {
            backgroundColor: '#fff',
        },
    }
});

const DrawerNavigator =  createDrawerNavigator({
    Home:{
        screen:appTabNavigator
    },
    Settings:{
        screen:SettingScreen,
        navigationOptions: {
            drawerLabel:'Setting',
            drawerIcon:({tintColor})=>(
                <CachedImage name={'drafts'} size={24} source={require('./assets/images/tab/Tab_icon_home_nor.png')}  style={[styles.tabBarImage,{tintColor: tintColor}]}/>
            )
        }
    }
},{
    initialRouteName: 'Home',
    drawerWidth:  width-100, // 展示的宽度
    drawerPosition: 'left', // 抽屉在左边还是右边
    contentComponent: props => (<CustomDrawerContentComponent {...props} />)
});

const CustomDrawerContentComponent = props => {
    return (
        <ScrollView style={{flex: 1,backgroundColor:'#fff'}}>
            <TouchableOpacity
                style={styles.btnStyle}
                onPress={() => props.navigation.navigate("Settings")}
            >
                <Text style={{fontSize:18}}>设置</Text>
            </TouchableOpacity>
        </ScrollView>
    )
};

const  StackNavigator = createStackNavigator({
    Login:{
        screen:LoginScreen,
    },
    Home:{
        screen:DrawerNavigator,
    },
    ...other
},{
    headerMode: 'none',
    headerBackTitleVisible: false,
    initialRouteName:'Login'
});

const styles = StyleSheet.create({
    tabBarImage: {
        width: 24,
        height: 24,
    },
    btnStyle: {
        height: 45,
        width: width-100,
        justifyContent: "center",
        // alignItems: "center",
        margin: 1,
        backgroundColor: "#fff",
        paddingLeft:20,
        lineHeight:45,
    },
});

const Url = createAppContainer(StackNavigator);
export default Url;

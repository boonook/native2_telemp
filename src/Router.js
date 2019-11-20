import React, {Component} from 'react';
import {StyleSheet, Text,ScrollView,Dimensions,TouchableOpacity,View } from 'react-native';
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
import SchoolOutSellScreen from './screen/home/commont/SchoolOutSellScreen';
import ReplaceRunLegScreen from './screen/home/commont/ReplaceRunLegScreen';
import TransceiverExpressScreen from './screen/home/commont/TransceiverExpressScreen';
import FleaMarketsScreen from './screen/home/commont/FleaMarketsScreen';
import SchoolForumScreen from './screen/home/commont/SchoolForumScreen';
import SchoolPioneerScreen from './screen/home/commont/SchoolPioneerScreen';
import InvitedGiftScreen from './screen/home/commont/InvitedGiftScreen';
import PermissionSettingScreen from './screen/permissionSetting/PermissionSettingScreen';
import DrawerScreen from './screen/drawer/DrawerScreen';
import ImageZoomViewerScreen from './components/imageZoomViewer/ImageZoomViewerScreen';
import ErWeiCodeScreen from './components/erWeiCode/ErWeiCodeScreen';
import CountScreen from './components/count/CountScreen';
import MoreImgUploadScreen from './components/moreImgUpload/MoreImgUploadScreen';
import FilesManageScreen from './components/filesManage/FilesManageScreen';
import LeftSwiperScreen from './components/leftSwiper/LeftSwiperScreen';
import TongxunLogsScreen from './components/tongxunLogs/TongxunLogsScreen';

const {height,width} =  Dimensions.get('window');
const other = {
    BaiduMap:{
        screen:BaiduMap
    },
    MySetting:{
        screen:MySetting
    },
    SchoolOutSell:{
        screen:SchoolOutSellScreen
    },
    ReplaceRunLeg:{
        screen:ReplaceRunLegScreen
    },
    TransceiverExpress:{
        screen:TransceiverExpressScreen
    },
    SchoolOutPartTime:{
        screen:SchoolOutSellScreen
    },
    FleaMarkets:{
        screen:FleaMarketsScreen
    },
    SchoolForum:{
        screen:SchoolForumScreen
    },
    SchoolPioneer:{
        screen:SchoolPioneerScreen
    },
    InvitedGift:{
        screen:InvitedGiftScreen
    },
    PermissionSetting:{
        screen:PermissionSettingScreen
    },
    ImageZoomViewerScreen:{
        screen:ImageZoomViewerScreen
    },
    ErWeiCodeScreen:{
        screen:ErWeiCodeScreen
    },
    CountScreen:{
        screen:CountScreen
    },
    MoreImgUploadScreen:{
        screen:MoreImgUploadScreen
    },
    FilesManageScreen:{
        screen:FilesManageScreen
    },
    LeftSwiper:{
        screen:LeftSwiperScreen
    },
    TongxunLogs:{
        screen:TongxunLogsScreen
    }
};

/**
 * 普通用户的底部导航
 * **/
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

/***
 * 专家登陆的底部导航
 * ****/
const expertAppTabNavigator = createBottomTabNavigator({
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
})

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
    drawerWidth:  width, // 展示的宽度
    drawerPosition: 'left', // 抽屉在左边还是右边
    contentComponent: props => (<CustomDrawerContentComponent {...props} />)
});

const ExpertDrawerNavigator =  createDrawerNavigator({
    expertHome:{
        screen:expertAppTabNavigator
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
    initialRouteName: 'expertHome',
    drawerWidth:  width, // 展示的宽度
    drawerPosition: 'left', // 抽屉在左边还是右边
    contentComponent: props => (<CustomDrawerContentComponent {...props} />)
})

const CustomDrawerContentComponent = props => {
    return (
        <DrawerScreen props={props}/>
    )
};
{/*<ScrollView style={{flex: 1,backgroundColor:'#f4f4f4'}}>*/}
{/*    <View style={{paddingTop:40}}>*/}
{/*        <TouchableOpacity*/}
{/*            style={styles.btnStyle}*/}
{/*            onPress={() => props.navigation.navigate("Settings")}*/}
{/*        >*/}
{/*            <Text style={{fontSize:18}}>设置222</Text>*/}
{/*        </TouchableOpacity>*/}
{/*    </View>*/}
{/*</ScrollView>*/}

const  StackNavigator = createStackNavigator({
    Login:{
        screen:LoginScreen,
    },
    Home:{
        screen:DrawerNavigator,
    },
    expertHome:{
        screen:ExpertDrawerNavigator
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

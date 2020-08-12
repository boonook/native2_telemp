import React, { Component } from "react";
import {View, Text, ImageBackground, TouchableOpacity, StatusBar, Platform, Alert} from "react-native";
import { connect } from 'react-redux';
import {NavigationActions} from "react-navigation";
import JPushModule from 'jpush-react-native'
import {CachedImageBackground} from "react-native-img-cache";
@connect(({home,auth})=>({home,auth}))
export default class Loading extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null, // 隐藏头部
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            time:5
        };
        this.onInitPress = this.onInitPress.bind(this)
        this.onStopPress = this.onStopPress.bind(this)
        this.onResumePress = this.onResumePress.bind(this)
        this.onGetRegistrationIdPress = this.onGetRegistrationIdPress.bind(this)
        this.jumpSecondActivity = this.jumpSecondActivity.bind(this)
        this.setTag = this.setTag.bind(this)
        this.setAlias = this.setAlias.bind(this)
        this.setBaseStyle = this.setBaseStyle.bind(this)
        this.setCustomStyle = this.setCustomStyle.bind(this)
    };


    componentDidUpdate(prevProps, prevState, snapshot): void {

    }

    componentWillUnmount () {
        // JPushModule.removeReceiveCustomMsgListener(this.receiveCustomMsgListener)
        // JPushModule.removeReceiveNotificationListener(this.receiveNotificationListener)
        // JPushModule.removeReceiveOpenNotificationListener(this.openNotificationListener)
        // JPushModule.removeGetRegistrationIdListener(this.getRegistrationIdListener)
        // console.log('Will clear all notifications')
        // JPushModule.clearAllNotifications();
    }

    componentWillUnmount(){
        clearInterval(this.timeOut)
    }
    componentDidMount(){
        this.timeOut=setInterval(()=>{
            if(this.state.time===0){
               this.jumpOver()
            }else{
                this.setState({
                    time:this.state.time-1
                })
            }
        },1000)
        JPushModule.initPush();
        if (Platform.OS === 'android') {
            JPushModule.notifyJSDidLoad(resultCode => {
                if (Platform.OS === 'android') {
                    JPushModule.addReceiveNotificationListener((message) => {
                        if (this.props.auth.isLogin) {
                            this.props.navigation.navigate("Message")
                        } else {
                            this.setState({
                                messageNoticeStatus: true
                            })
                        }
                    });
                    JPushModule.addReceiveOpenNotificationListener((map) => {
                        if (this.props.auth.isLogin) {
                            this.props.navigation.navigate("Message")
                        } else {
                            this.setState({
                                messageNoticeStatus: true
                            })
                        }
                    });
                }
                if (resultCode === 0) {
                }
            })
        } else {
            // JPushModule.setupPush()
        }
        this.receiveCustomMsgListener = map => {
            this.setState({
                pushMsg: map.content
            })
            // console.log('extras: ' + map.extras)
        }

        JPushModule.addReceiveCustomMsgListener(this.receiveCustomMsgListener)
        this.receiveNotificationListener = map => {
            console.log('alertContent: ' + map.alertContent)
            console.log('extras: ' + map.extras)
        }
        JPushModule.addReceiveNotificationListener(this.receiveNotificationListener)

        this.openNotificationListener = map => {
            ///ios点击打开信息
            if (this.props.auth.isLogin) {
                this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Message' })]);
            } else {
                this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Login' })]);
            }
        }
        JPushModule.addReceiveOpenNotificationListener(this.openNotificationListener);

        this.getRegistrationIdListener = registrationId => {
            console.log('Device register succeed, registrationId ' + registrationId)
        }
        JPushModule.addGetRegistrationIdListener(this.getRegistrationIdListener);
    }

    jumpOver=()=>{
        clearInterval(this.timeOut);
        this.timeOut = null;
        this.setState({
            time:0
        });
        if(this.props.auth.isLogin){
            this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Home'})]);
        }else{
            this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Login' })]);
        }
    };
    jumpSecondActivity () {
        this.props.navigation.navigate('Push')
    }

    onInitPress () {
        JPushModule.initPush()
    }

    onStopPress () {
        JPushModule.stopPush()
        console.log('Stop push press')
    }

    onResumePress () {
        JPushModule.resumePush()
        console.log('Resume push press')
    }

    onGetRegistrationIdPress () {
        JPushModule.getRegistrationID(registrationId => {
            this.setState({
                registrationId: registrationId
            })
        })
    }

    setTag () {
        if (this.state.tag) {
            /**
             * 请注意这个接口要传一个数组过去，这里只是个简单的示范
             */
            JPushModule.setTags(this.state.tag.split(','), map => {
                if (map.errorCode === 0) {
                    console.log('Tag operate succeed, tags: ' + map.tags)
                } else {
                    console.log('error code: ' + map.errorCode)
                }
            })
        }
    }

    setAlias () {
        if (this.state.alias !== undefined) {
            JPushModule.setAlias(this.state.alias, map => {
                if (map.errorCode === 0) {
                    console.log('set alias succeed')
                } else {
                    console.log('set alias failed, errorCode: ' + map.errorCode)
                }
            })
        }
    }


    setBaseStyle=()=>{
        if (Platform.OS === 'android') {
            JPushModule.setStyleBasic()
        } else {
            Alert.alert('iOS not support this function', '')
        }
    }

    setCustomStyle=()=>{
        if (Platform.OS === 'android') {
            JPushModule.setStyleCustom()
        } else {
            Alert.alert('iOS not support this function', '')
        }
    }
    onHasPermission =() =>{
        JPushModule.hasPermission( res => {
            console.log(`onHasPermission ${res}`)
        })
    }

    render() {
        return (
            <View style={{flex:1}}>
                <StatusBar backgroundColor={'#ab1c31'} barStyle={'light-content'}/>
                <View style={{position:'absolute',top:60,right:15,zIndex:999999999,elevation:9999999}}>
                    <TouchableOpacity style={{backgroundColor:'rgba(0,0,0,0.4)',borderRadius:5}} onPress={()=>{
                        this.jumpOver()
                    }}>
                        <Text style={{color:'#fff',fontSize:13,padding:5}}>跳过{this.state.time+'s'}</Text>
                    </TouchableOpacity>
                </View>
                <CachedImageBackground source={require('../../assets/images/login-bg.png')} style={{width: '100%', height: '100%',justifyContent:'center',alignItems:"center"}}>
                    <Text style={{color:'#fff',fontSize:16}}>不忘初心，牢记使命</Text>
                </CachedImageBackground>
                <View style={{alignItems:"center",position:'absolute',bottom:40,zIndex:999999999,elevation:9999999,width:'100%'}}>
                    <Text style={{color:'#ccc',fontSize:13}}>武汉大海信息系统科技有限公司</Text>
                </View>
            </View>
        );
    }
}

import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, StatusBar,Dimensions} from 'react-native';
import {Button, Icon, Modal, Provider, Checkbox,InputItem} from '@ant-design/react-native'
import{ImageCache}from"react-native-img-cache";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import RNFetchBlob from "rn-fetch-blob";
import {NavigationActions} from "react-navigation";
const {height,width} =  Dimensions.get('window');

export default class LoginScreen extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null, // 隐藏头部
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            cacheSize:'0M',
            url:'',
            userName:'',
            userPwd:''
        };
    };
    componentWillMount(){

    };
    componentDidMount(){
        this.getSize();
    };

    onLogin=()=>{
        this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Home' })]);
    };

    onGoBaiduMap=()=>{
        this.props.navigation.navigate("BaiduMap");
    };

    ///注册
    onRegistered=()=>{
        this.props.navigation.navigate("PermissionSetting");
    };

    ///记住密码
    onRememberPassword=()=>{

    }

    getSize=()=>{
        RNFetchBlob.fs.lstat(RNFetchBlob.fs.dirs.CacheDir + '/react-native-img-cache')
            .then((stats) => {
                console.log(stats);
                let bytes = 0;
                stats.map(f => {
                    bytes += Number(f.size);
                });
                let cacheSize = this.bytesToSize(bytes);
                this.setState({
                    cacheSize
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    bytesToSize(bytes) {
        if (bytes === 0) {
            return '0 B';
        }

        let k = 1024;

        let sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        let i = Math.floor(Math.log(bytes) / Math.log(k));

        let num = bytes / Math.pow(k, i);
        return num.toPrecision(3) + ' ' + sizes[i];
    }

    ///清理缓存
    onClearSpace=()=>{
        Modal.alert('提醒', '你确定要清除缓存吗？', [
            {
                text: '取消',
                onPress: () => {
                    // console.log('cancel')
                },
                style: '确定',
            },
            { text: '确定', onPress: () =>{
                    ImageCache.get().clear();
                    this.setState({
                        cacheSize:'0'
                    })
                }},
        ]);
        console.log('清理缓存')
    }

    render(){
        return (
            <Provider>
                <StatusBar backgroundColor={'green'} barStyle="dark-content"/>
                <View style={styles.login_box}>
                    <KeyboardAwareScrollView  keyboardShouldPersistTaps={'always'}>
                        <View style={{height:height,width:width}}>
                            <View style={styles.formContent}>
                                <Text style={styles.formHeader}>欢迎登陆</Text>
                                <View style={styles.loginInput}>
                                    <InputItem
                                        style={{color:'#fff'}}
                                        labelNumber={2}
                                        clear
                                        value={this.state.userName}
                                        onChange={value => {
                                            this.setState({
                                                userName:value
                                            });
                                        }}
                                        placeholder="用户名"
                                        placeholderTextColor={'rgba(254,254,254,0.7)'}
                                    >
                                        <Icon name={'user'}/>
                                    </InputItem>
                                </View>
                                <View style={styles.loginInput}>
                                    <InputItem
                                        clear
                                        type={'password'}
                                        style={{color:'#fff'}}
                                        labelNumber={2}
                                        value={this.state.userPwd}
                                        onChange={value => {
                                            this.setState({
                                                userPwd:value,
                                            });
                                        }}
                                        placeholder="密码"
                                        placeholderTextColor={'rgba(254,254,254,0.7)'}
                                    >
                                        <Icon name={'lock'} />
                                    </InputItem>
                                </View>
                                <View style={[{flexDirection:'row',alignItems:'flex-end',paddingTop:15}]}>
                                    <View style={{flex:1}}>
                                        <Checkbox.AgreeItem
                                            style={{backgroundColor:'transparent',borderBottomWidth:0}}
                                            checkboxStyle={{ color: '#fff' }}
                                            checked={this.state.rememberUserNameStatus}
                                            onChange={event => {
                                                this.onRememberPassword(event);
                                            }}
                                        >
                                            <Text style={{borderBottomWidth:0,color:'#fff'}}>记住密码</Text>
                                        </Checkbox.AgreeItem>
                                    </View>
                                    <View>
                                        <TouchableOpacity
                                            onPress={()=>{
                                                this.onRegistered();
                                            }}
                                        >
                                            <Text style={{color:'#fff',fontSize:12}}>注册账号</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.loginInput}>
                                    <Button
                                        loading={this.state.disabled}
                                        type="default"
                                        onPress={()=>{
                                            this.onLogin()
                                        }}
                                    >登录</Button>
                                </View>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                    {/*<TouchableOpacity onPress={this.onLogin}>*/}
                    {/*    <Text>登陆</Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>
            </Provider>
            )
    }

}

const styles = StyleSheet.create({
    login_box:{
        flex:1,
        backgroundColor:'green',
        justifyContent:'center',
        alignItems:'center'
    },
    formContent:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding:15,
    },
    formHeader:{
        fontSize:25,
        color:'#fff',
        marginBottom:25,
        padding:15
    },
    loginInput:{
        marginTop:15
    }
})



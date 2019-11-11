import React, {Component} from 'react';
import {Text, View, TouchableOpacity,StyleSheet} from 'react-native';
import {Button, Modal,Provider} from '@ant-design/react-native';
import {showImagePicker} from '../../../utils/tools';
import RNFetchBlob from 'rn-fetch-blob';
import {ImageCache} from 'react-native-img-cache';
import HeaderDetailScreen from '../../../components/header/HeaderDetailScreen';

export default class MySetting extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null, // 隐藏头部
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            cacheSize:'0M',
            visible:false,
            visibleNum:0,
        };
    };
    componentWillMount(){

    };
    componentDidMount(){

    };

    onLoginOut=()=>{
        this.setState({
            visible:true,
            visibleNum:2
        });
    };

    ///选择图片
    onSelectImg=()=>{
        showImagePicker().then(res=>{
            this.setState({
                url:res.uri
            })
        });
    };
    ///获取缓存
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
    };

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
        this.setState({
            visible:true,
            visibleNum:1
        });
    };

    onClearSpaceSure=()=>{
        if(this.state.visibleNum===1){
            ImageCache.get().clear();
            this.setState({
                cacheSize:'0'
            },()=>{
                this.setState({
                    visible: false,
                    visibleNum:0
                });
            })
        }else if(this.state.visibleNum===2){
            this.props.navigation.navigate("Login");
            this.setState({
                visible: false,
                visibleNum:0
            });
        }
    }

    ///返回商机
    onGoBaCK=()=>{
        this.props.navigation.goBack();
    };

    onClose=()=>{
        this.setState({
            visible: false,
            visibleNum:0
        });
    }

    render(){
        return (
            <Provider>
                <View style={{flex:1,}}>
                    <HeaderDetailScreen  title={'设置'} goBack={()=>{
                        this.onGoBaCK()
                    }}></HeaderDetailScreen>
                    <View style={{flex:1,padding:15}}>
                        <View style={styles.content}>
                            <View style={styles.footerBox}>
                                <TouchableOpacity>
                                    <View style={styles.footer}>
                                        <View style={styles.footerLeft}>
                                            <Text>消息通知</Text>
                                        </View>
                                        <Text>已开启</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{
                                    this.onClearSpace()
                                }}>
                                    <View style={styles.footer}>
                                        <View style={styles.footerLeft}>
                                            <Text>清除缓存</Text>
                                        </View>
                                        <Text>{this.state.cacheSize}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.loginOutBox}>
                        <TouchableOpacity  onPress={this.onLoginOut}>
                            <View style={styles.loginOut}>
                                <Text style={{textAlign:'center',color:'#fff'}}>退出登录</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Modal
                        popup
                        visible={this.state.visible}
                        animationType="slide-up"
                        onClose={this.onClose}
                        style={{backgroundColor:'transparent'}}
                    >
                        <View style={{margin:15}}>
                            <TouchableOpacity onPress={this.onClearSpaceSure}>
                                <View style={styles.cancel}>
                                    <Text style={{ textAlign: 'center',color:'red',fontSize:16 }}>确定</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.cancelBox}>
                            <TouchableOpacity onPress={this.onClose}>
                                <View style={styles.cancel}>
                                    <Text style={{textAlign:'center',fontSize:16 }}>取消</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        borderBottomWidth:1,
        paddingBottom:15,
        borderColor:'#f4f4f4',
        borderStyle:'solid',
        alignItems:'center'
    },
    headerLeft:{
        width:88,
        height:88,
        borderRadius:44,
        overflow:'hidden'
    },
    headerRight:{
        flex:1,
        paddingLeft:15,
    },
    headerName:{
        fontSize:20,
        fontWeight:'600',
        lineHeight:40
    },
    headerMobile:{
        fontSize:14,
        lineHeight:24
    },
    content:{

    },
    contentTop:{
        flexDirection:'row'
    },
    contentTopItem:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    contentTopItemTitle:{
        lineHeight:30
    },
    contentTopItemImgBox:{
        width:60,
        height:60,
        borderRadius:5,
        backgroundColor:'#f4f4f4'
    },
    footerBox:{
        paddingTop:0,
    },
    footer:{
        flexDirection:'row',
        borderBottomWidth:1,
        borderColor:'#ccc',
        borderStyle: 'solid',
        paddingTop:15,
        paddingBottom:15,
        alignItems:'center'
    },
    footerLeft:{
        flex:1
    },
    loginOut:{
        backgroundColor:'red',
        paddingBottom:15,
        paddingTop:15,
        textAlign:'center',
        color:'#fff',
        borderRadius:5
    },
    loginOutBox:{
        paddingLeft:15,
        paddingRight:15,
        paddingBottom:150
    },
    cancel:{
        padding:20,
        backgroundColor:'#fff',
        borderRadius:8,
    },
    cancelBox:{
        paddingBottom:20,
        paddingLeft:15,
        paddingRight:15
    },
})

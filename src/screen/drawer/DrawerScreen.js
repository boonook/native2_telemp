import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ScrollView, Image} from 'react-native';
import {Icon} from '@ant-design/react-native';
import HeaderDrawerScreen from '../../components/header/HeaderDrawerScreen';

export default class DrawerScreen extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null, // 隐藏头部
        }
    };
    constructor(props) {
        super(props);
        this.state = {

        };
    };
    componentWillMount(){

    };
    componentDidMount(){

    };

    onClose=()=>{
        this.props.props.navigation.toggleDrawer()
    };

    render(){
        return (
            <View style={{flex:1}}>
                <HeaderDrawerScreen onClose={()=>{
                    this.onClose()
                }}/>
                <View style={{flexDirection:'row',padding:15,alignItems:'center'}}>
                    <View>
                        <View style={styles.drawer_image}>
                            <Image style={{width:70, height:70}} source={require('../../assets/images/heyi.jpg')}/>
                        </View>
                    </View>
                    <View style={{flex:1,paddingLeft:20}}>
                        <Text style={styles.userName}>三人行必有我师</Text>
                        <Text numberOfLines={1}>三人行必有我师,三人行必有我师三人行必有我师三人行必有我师</Text>
                    </View>
                </View>
                <ScrollView style={{flex:1,paddingTop:15,paddingLeft:15,paddingRight:15}}>
                    <TouchableOpacity onPress={()=>{
                        this.props.props.navigation.toggleDrawer();
                        this.props.props.navigation.navigate("ErWeiCodeScreen")
                    }}>
                        <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingTop:15,paddingBottom:15}}>
                            <View>
                                <Icon name="issues-close" size="md" color="#444" />
                            </View>
                            <View style={{flex:1,paddingLeft:15}}>
                                <Text>扫描二维码(待开发)</Text>
                            </View>
                            <View>
                                <Icon name="right" size="md" color="#444" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        this.props.props.navigation.toggleDrawer();
                        this.props.props.navigation.navigate("ImageZoomViewerScreen")
                    }}>
                        <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingTop:15,paddingBottom:15}}>
                            <View>
                                <Icon name="issues-close" size="md" color="#444" />
                            </View>
                            <View style={{flex:1,paddingLeft:15}}>
                                <Text>图片预览</Text>
                            </View>
                            <View>
                                <Icon name="right" size="md" color="#444" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        this.props.props.navigation.toggleDrawer();
                        this.props.props.navigation.navigate("MoreImgUploadScreen")
                    }}>
                        <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingTop:15,paddingBottom:15}}>
                            <View>
                                <Icon name="issues-close" size="md" color="#444" />
                            </View>
                            <View style={{flex:1,paddingLeft:15}}>
                                <Text>多图片上传</Text>
                            </View>
                            <View>
                                <Icon name="right" size="md" color="#444" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        this.props.props.navigation.toggleDrawer();
                        this.props.props.navigation.navigate("BaiduMap")
                    }}>
                        <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingTop:15,paddingBottom:15}}>
                            <View>
                                <Icon name="issues-close" size="md" color="#444" />
                            </View>
                            <View style={{flex:1,paddingLeft:15}}>
                                <Text>百度地图</Text>
                            </View>
                            <View>
                                <Icon name="right" size="md" color="#444" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        this.props.props.navigation.toggleDrawer();
                        this.props.props.navigation.navigate("PermissionSetting")
                    }}>
                        <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingTop:15,paddingBottom:15}}>
                            <View>
                                <Icon name="issues-close" size="md" color="#444" />
                            </View>
                            <View style={{flex:1,paddingLeft:15}}>
                                <Text>权限管理</Text>
                            </View>
                            <View>
                                <Icon name="right" size="md" color="#444" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => {
                        this.props.props.navigation.toggleDrawer();
                        this.props.props.navigation.navigate("CountScreen")
                    }}>
                        <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingTop:15,paddingBottom:15}}>
                            <View>
                                <Icon name="issues-close" size="md" color="#444" />
                            </View>
                            <View style={{flex:1,paddingLeft:15}}>
                                <Text>统计</Text>
                            </View>
                            <View>
                                <Icon name="right" size="md" color="#444" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.props.props.navigation.toggleDrawer();
                        this.props.props.navigation.navigate("Settings")
                    }}>
                        <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingTop:15,paddingBottom:15}}>
                            <View>
                                <Icon name="issues-close" size="md" color="#444" />
                            </View>
                            <View style={{flex:1,paddingLeft:15}}>
                                <Text>设置(待开发)</Text>
                            </View>
                            <View>
                                <Icon name="right" size="md" color="#444" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingTop:15,paddingBottom:15}}>
                            <View>
                                <Icon name="issues-close" size="md" color="#444" />
                            </View>
                            <View style={{flex:1,paddingLeft:15}}>
                                <Text>动态底部导航菜单</Text>
                            </View>
                            <View>
                                <Icon name="right" size="md" color="#444" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.props.props.navigation.toggleDrawer();
                        this.props.props.navigation.navigate("FilesManageScreen")
                    }}>
                        <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingTop:15,paddingBottom:15}}>
                            <View>
                                <Icon name="issues-close" size="md" color="#444" />
                            </View>
                            <View style={{flex:1,paddingLeft:15}}>
                                <Text>文件管理（待开发）</Text>
                            </View>
                            <View>
                                <Icon name="right" size="md" color="#444" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.props.props.navigation.toggleDrawer();
                        this.props.props.navigation.navigate("LeftSwiper")
                    }}>
                        <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingTop:15,paddingBottom:15}}>
                            <View>
                                <Icon name="issues-close" size="md" color="#444" />
                            </View>
                            <View style={{flex:1,paddingLeft:15}}>
                                <Text>侧滑组件</Text>
                            </View>
                            <View>
                                <Icon name="right" size="md" color="#444" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.props.props.navigation.toggleDrawer();
                        this.props.props.navigation.navigate("LeftSwiper")
                    }}>
                        <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingTop:15,paddingBottom:15}}>
                            <View>
                                <Icon name="issues-close" size="md" color="#444" />
                            </View>
                            <View style={{flex:1,paddingLeft:15}}>
                                <Text>我的消息</Text>
                            </View>
                            <View>
                                <Icon name="right" size="md" color="#444" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.props.props.navigation.toggleDrawer();
                        this.props.props.navigation.navigate("TongxunLogs")
                    }}>
                        <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingTop:15,paddingBottom:15}}>
                            <View>
                                <Icon name="issues-close" size="md" color="#444" />
                            </View>
                            <View style={{flex:1,paddingLeft:15}}>
                                <Text>通讯录</Text>
                            </View>
                            <View>
                                <Icon name="right" size="md" color="#444" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{height:30}}>

                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    drawer_image:{
        width:70,
        height:70,
        borderRadius:35,
        overflow:'hidden'
    },
    userName:{
        fontWeight:'600',
        fontSize:16
    }
})

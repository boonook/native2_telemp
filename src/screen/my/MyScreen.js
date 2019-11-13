import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image,StyleSheet} from 'react-native';
import {Icon, Modal,Provider} from '@ant-design/react-native';
import HeaderScreen from '../../components/header/HeaderScreen';
import {showImagePicker} from '../../utils/tools';

export default class MyScreen extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null, // 隐藏头部
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            cacheSize:'0M',
        };
    };
    componentWillMount(){

    };
    componentDidMount(){

    };

    onLoginOut=()=>{
        this.props.navigation.navigate("Login");
    };

    ///选择图片
    onSelectImg=()=>{
        showImagePicker().then(res=>{
            this.setState({
                url:res.uri
            })
        });
    };

    onGoSetting=()=>{
        this.props.navigation.navigate("MySetting");
    };

    render(){
        return (
            <Provider>
                <View style={{flex:1,backgroundColor:'#f4f4f4'}}>
                    <HeaderScreen title={'我的'}/>
                    <View style={{flex:1}}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={()=>{
                                this.onSelectImg
                            }}>
                                <View style={styles.headerLeft}>
                                    <Image  style={{width:88, height:88}} source={require('../../assets/images/heyi_top.jpg')}/>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.headerRight}>
                                <View><Text><Text style={styles.headerName}>小蕾力</Text><Text style={{color:'red'}}>兼职会员</Text></Text></View>
                                <View><Text style={styles.headerMobile}>18888888888</Text></View>
                                <View><Text style={styles.headerMobile}><Text>经济系</Text><Text>大三</Text></Text></View>
                            </View>
                        </View>
                        <View style={styles.content}>
                            <View  style={styles.contentTop}>
                                <View  style={styles.contentTopItem}>
                                    <View style={styles.contentTopItemImgBox}>
                                        {/*<Image  style={{width:60, height:60}} source={require('../../assets/images/heyi_top.jpg')}/>*/}
                                    </View>
                                    <View>
                                        <Text style={styles.contentTopItemTitle}>收藏</Text>
                                    </View>
                                </View>
                                <View  style={styles.contentTopItem}>
                                    <View style={styles.contentTopItemImgBox}>
                                        {/*<Image  style={{width:60, height:60}} source={require('../../assets/images/heyi_top.jpg')}/>*/}
                                    </View>
                                    <View>
                                        <Text style={styles.contentTopItemTitle}>我的会员</Text>
                                    </View>
                                </View>
                                <View  style={styles.contentTopItem}>
                                    <View style={styles.contentTopItemImgBox}>
                                        {/*<Image  style={{width:60, height:60}} source={require('../../assets/images/heyi_top.jpg')}/>*/}
                                    </View>
                                    <View>
                                        <Text style={styles.contentTopItemTitle}>我的信息</Text>
                                    </View>
                                </View>
                                <View  style={styles.contentTopItem}>
                                    <View style={styles.contentTopItemImgBox}>
                                        {/*<Image  style={{width:60, height:60}} source={require('../../assets/images/heyi_top.jpg')}/>*/}
                                    </View>
                                    <View>
                                        <Text style={styles.contentTopItemTitle}>我的钱包</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.footerBox}>
                                <TouchableOpacity onPress={this.onGoSetting}>
                                    <View style={styles.footer}>
                                        <View style={styles.footerLeft}>
                                            <Text>设置</Text>
                                        </View>
                                        <Icon name="right" size="md" color="#ccc" />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <View style={styles.footer}>
                                        <View style={styles.footerLeft}>
                                            <Text>关于我们</Text>
                                        </View>
                                        <Icon name="right" size="md" color="#ccc" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
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
        alignItems:'center',
        backgroundColor:'#fff',
        padding:15
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
        padding:15,
        backgroundColor:'#fff',
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
      paddingTop: 30,
    },
    footer:{
        flexDirection:'row',
        paddingTop:15,
        paddingBottom:15
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
        marginTop:50,
    }
})

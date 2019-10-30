import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import HeaderDetailScreen from '../../../components/header/HeaderDetailScreen';

export default class SchoolOutPartTimeScreen extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null, // 隐藏头部
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            banners: [{}, {}, {}],
            data:[{},{},{},{}, {}, {},{}, {}, {},{}, {}, {}],
            dataTotal:0,
            refreshing: false,
            city:''
        };
    };
    componentWillMount(){

    };
    componentDidMount(){

    };

    ///返回上级
    onGoBaCK=()=>{
        this.props.navigation.goBack();
    };

    render(){
        return (
            <View style={{flex:1}}>
                <HeaderDetailScreen title={'校外兼职'} goBack={()=>{
                    this.onGoBaCK()
                }}></HeaderDetailScreen>
                <ScrollView>
                    <View style={{flex:1,padding:15}}>
                        <View  style={styles.contentTop}>
                            <View  style={styles.contentTopItem}>
                                <View style={styles.contentTopItemImgBox}>
                                    {/*<Image  style={{width:60, height:60}} source={require('../../assets/images/heyi_top.jpg')}/>*/}
                                </View>
                                <View>
                                    <Text style={styles.contentTopItemTitle}>校园外卖</Text>
                                </View>
                            </View>
                            <View  style={styles.contentTopItem}>
                                <View style={styles.contentTopItemImgBox}>
                                    {/*<Image  style={{width:60, height:60}} source={require('../../assets/images/heyi_top.jpg')}/>*/}
                                </View>
                                <View>
                                    <Text style={styles.contentTopItemTitle}>代跑腿</Text>
                                </View>
                            </View>
                            <View  style={styles.contentTopItem}>
                                <View style={styles.contentTopItemImgBox}>
                                    {/*<Image  style={{width:60, height:60}} source={require('../../assets/images/heyi_top.jpg')}/>*/}
                                </View>
                                <View>
                                    <Text style={styles.contentTopItemTitle}>收发快递</Text>
                                </View>
                            </View>
                            <View  style={styles.contentTopItem}>
                                <View style={styles.contentTopItemImgBox}>
                                    {/*<Image  style={{width:60, height:60}} source={require('../../assets/images/heyi_top.jpg')}/>*/}
                                </View>
                                <View>
                                    <Text style={styles.contentTopItemTitle}>校外兼职</Text>
                                </View>
                            </View>
                            <View  style={styles.contentTopItem}>
                                <View style={styles.contentTopItemImgBox}>
                                    {/*<Image  style={{width:60, height:60}} source={require('../../assets/images/heyi_top.jpg')}/>*/}
                                </View>
                                <View>
                                    <Text style={styles.contentTopItemTitle}>跳蚤市场</Text>
                                </View>
                            </View>
                            <View  style={styles.contentTopItem}>
                                <View style={styles.contentTopItemImgBox}>
                                    {/*<Image  style={{width:60, height:60}} source={require('../../assets/images/heyi_top.jpg')}/>*/}
                                </View>
                                <View>
                                    <Text style={styles.contentTopItemTitle}>校园论坛</Text>
                                </View>
                            </View>
                            <View  style={styles.contentTopItem}>
                                <View style={styles.contentTopItemImgBox}>
                                    {/*<Image  style={{width:60, height:60}} source={require('../../assets/images/heyi_top.jpg')}/>*/}
                                </View>
                                <View>
                                    <Text style={styles.contentTopItemTitle}>校园创业</Text>
                                </View>
                            </View>
                            <View  style={styles.contentTopItem}>
                                <View style={styles.contentTopItemImgBox}>
                                    {/*<Image  style={{width:60, height:60}} source={require('../../assets/images/heyi_top.jpg')}/>*/}
                                </View>
                                <View>
                                    <Text style={styles.contentTopItemTitle}>邀请有礼</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.homeContentBox}>
                            {this.state.data.map((item,index)=>{
                                return (
                                    <View key={index}>
                                        <TouchableOpacity
                                            onPress={()=>{
                                                this.viewPartyList(item)
                                            }}
                                        >
                                            <View style={styles.homeContent}>
                                                <View style={styles.homeContentLeft}>

                                                </View>
                                                <View style={styles.homeContentRight}>
                                                    <View>
                                                        <Text style={styles.homeContentRightTitle}>单子名称</Text>
                                                    </View>
                                                    <View>
                                                        <Text style={styles.homeContentRightName}>姓名</Text>
                                                    </View>
                                                    <View>
                                                        <Text style={styles.homeContentRightName}>地点</Text>
                                                    </View>
                                                    <View>
                                                        <Text style={styles.homeContentRightName}>金额</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'transparent',
    },
    homeContentBox:{
        borderStyle:'solid',
        borderTopWidth:1,
        borderColor:'#f4f4f4'
    },
    containerHorizontal: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor:'#f4f4f4'
    },
    contentTop:{
        flexDirection:'row',
        flexWrap:'wrap'
    },
    contentTopItem:{
        width:'25%',
        alignItems:'center',
        justifyContent:'center',
        // paddingBottom:20
    },
    contentTopItemImgBox:{
        width:60,
        height:60,
        borderRadius:5,
        backgroundColor:'#f4f4f4'
    },
    contentTopItemTitle:{
        lineHeight:40
    },
    homeContent:{
        flexDirection:'row',
        paddingTop:15,
        alignItems:'center',
        borderBottomWidth:1,
        borderStyle:'solid',
        paddingBottom:15,
        borderColor:'#f4f4f4'
    },
    homeContentLeft:{
        width:100,
        height:100,
        borderRadius:5,
        backgroundColor:'#f4f4f4'
    },
    homeContentRight:{
        flex:1,
        paddingLeft:15
    },
    homeContentRightTitle:{
        fontSize:16,
        lineHeight:24
    },
    homeContentRightName:{
        fontSize:14,
        lineHeight:24
    }
})

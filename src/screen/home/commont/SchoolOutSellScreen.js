import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, ScrollView,Dimensions} from 'react-native';
import HeaderDetailScreen from '../../../components/header/HeaderDetailScreen';
import {Carousel, Icon} from '@ant-design/react-native';
const {height,width} =  Dimensions.get('window');

export default class SchoolOutSellScreen extends Component{
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
            data2:[{},{},{}],
            data1:[{},{},{}],
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
                <HeaderDetailScreen title={'校园外卖'} goBack={()=>{
                    this.onGoBaCK()
                }}></HeaderDetailScreen>
                <ScrollView>
                    <Carousel  style={styles.wrapper}
                               selectedIndex={2}
                               autoplay={true}
                               infinite>
                        {this.state.banners.map(((img, index) => (
                            <TouchableOpacity  key={index + ''}>
                                <View style={[styles.containerHorizontal,{padding:15,height:150}]}>
                                </View>
                            </TouchableOpacity>
                        )))}
                    </Carousel>
                    <View style={{flex:1,padding:15}}>
                        <View  style={styles.contentTop}>
                            <View  style={styles.contentTopItem}>
                                <View style={styles.contentTopItemImgBox}>
                                    {/*<Image  style={{width:60, height:60}} source={require('../../assets/images/heyi_top.jpg')}/>*/}
                                </View>
                                <View>
                                    <Text style={styles.contentTopItemTitle}>食堂代买</Text>
                                </View>
                            </View>
                            <View  style={styles.contentTopItem}>
                                <View style={styles.contentTopItemImgBox}>
                                    {/*<Image  style={{width:60, height:60}} source={require('../../assets/images/heyi_top.jpg')}/>*/}
                                </View>
                                <View>
                                    <Text style={styles.contentTopItemTitle}>精选好店</Text>
                                </View>
                            </View>
                            <View  style={styles.contentTopItem}>
                                <View style={styles.contentTopItemImgBox}>
                                    {/*<Image  style={{width:60, height:60}} source={require('../../assets/images/heyi_top.jpg')}/>*/}
                                </View>
                                <View>
                                    <Text style={styles.contentTopItemTitle}>水果零食</Text>
                                </View>
                            </View>
                            <View  style={styles.contentTopItem}>
                                <View style={styles.contentTopItemImgBox}>
                                    {/*<Image  style={{width:60, height:60}} source={require('../../assets/images/heyi_top.jpg')}/>*/}
                                </View>
                                <View>
                                    <Text style={styles.contentTopItemTitle}>美味早餐</Text>
                                </View>
                            </View>
                            <View  style={styles.contentTopItem}>
                                <View style={styles.contentTopItemImgBox}>
                                    {/*<Image  style={{width:60, height:60}} source={require('../../assets/images/heyi_top.jpg')}/>*/}
                                </View>
                                <View>
                                    <Text style={styles.contentTopItemTitle}>夜宵</Text>
                                </View>
                            </View>
                            <View  style={styles.contentTopItem}>
                                <View style={styles.contentTopItemImgBox}>
                                    {/*<Image  style={{width:60, height:60}} source={require('../../assets/images/heyi_top.jpg')}/>*/}
                                </View>
                                <View>
                                    <Text style={styles.contentTopItemTitle}>减脂清食</Text>
                                </View>
                            </View>
                            <View  style={styles.contentTopItem}>
                                <View style={styles.contentTopItemImgBox}>
                                    {/*<Image  style={{width:60, height:60}} source={require('../../assets/images/heyi_top.jpg')}/>*/}
                                </View>
                                <View>
                                    <Text style={styles.contentTopItemTitle}>饮品</Text>
                                </View>
                            </View>
                            <View  style={styles.contentTopItem}>
                                <View style={styles.contentTopItemImgBox}>
                                    {/*<Image  style={{width:60, height:60}} source={require('../../assets/images/heyi_top.jpg')}/>*/}
                                </View>
                                <View>
                                    <Text style={styles.contentTopItemTitle}>其他</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.homeContentBox}>
                            <View style={styles.homeContentBox_item}>
                               <View style={styles.homeContentBox_item}>
                                   <Text  style={styles.homeContentBox_item_title}>精选好店</Text>
                               </View>
                               <View style={styles.jingxuanShop}>
                                   {this.state.data1.map((item,index)=>(
                                       <View style={[{width:(width-30)/3}]}>
                                           <View style={styles.jingxuanShop_item_img}>
                                               <View style={styles.jingxuanShop_item_img_View}>

                                               </View>
                                           </View>
                                           <View>
                                               <Text style={styles.jingxuanShop_item_title}>兰州拉面</Text>
                                           </View>
                                       </View>
                                   ))}
                               </View>
                            </View>
                            <View style={styles.homeContentBox_item}>
                                <View>
                                    <Text  style={styles.homeContentBox_item_title}>推荐商家</Text>
                                </View>
                                <View style={styles.jingxuanShop}>
                                    {this.state.data2.map((item,index)=>(
                                        <View style={styles.tuijiaoShop}>
                                            <View style={styles.jingxuanShop_item_img}>
                                                <View style={styles.jingxuanShop_item_img_View}>

                                                </View>
                                            </View>
                                            <View style={styles.tuijiaoShopTitle}>
                                                <View style={styles.tuijiaoShopTitleleft}>
                                                    <Text>兰州拉面</Text>
                                                </View>
                                                <View style={styles.tuijiaoShopTitleright}>
                                                    <Icon tyle={[styles.headerIcon,{padding:5}]} name={'right'} />
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View>
                            <View style={styles.homeContentBox_item}>
                                <View>
                                    <Text  style={styles.homeContentBox_item_title}>附近买过</Text>
                                </View>
                                <View style={styles.jingxuanShop}>
                                    {this.state.data.map((item,index)=>(
                                        <View style={[{width:(width-30)/3}]}>
                                            <View style={styles.jingxuanShop_item_img}>
                                                <View style={styles.jingxuanShop_item_img_View}>

                                                </View>
                                            </View>
                                            <View>
                                                <Text style={styles.jingxuanShop_item_title}>兰州拉面</Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View>
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
        backgroundColor:'#f4f4f4',
        flexGrow: 1,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
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
    },
    homeContentBox_item:{

    },
    homeContentBox_item_title:{
        lineHeight:40,
        paddingLeft:5
    },
    containerHorizontal_item_left:{
        flex:1,
        backgroundColor:'#f4f4f4',
        marginRight:5,
        height:150
    },
    containerHorizontal_item_right:{
        flex:1,
        backgroundColor:'#f4f4f4',
        marginRight:5,
        height:150
    },
    jingxuanShop:{
        flexDirection:'row',
        flexWrap:'wrap'
    },
    jingxuanShop_item:{
        flex:1,
    },
    jingxuanShop_item_img:{
        width:'100%',
        height:120,
        padding:5
    },
    jingxuanShop_item_img_View:{
        width:'100%',
        height:120,
        backgroundColor:'#f4f4f4'
    },
    jingxuanShop_item_title:{
        lineHeight:50,
        textAlign:'center'
    },
    tuijiaoShop:{
        width:'100%',
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'#ccc',
        marginBottom:15
    },
    tuijiaoShopTitle:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        height:40,
        justifyContent:'center'
    },
    tuijiaoShopTitleleft:{
        flex:1,
        paddingLeft:5
    },
    tuijiaoShopTitleright:{
        width:30
    }
});

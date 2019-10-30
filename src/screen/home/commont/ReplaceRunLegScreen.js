import React, {Component} from 'react';
import {Text, View, StyleSheet,TextInput} from 'react-native';
import {Button} from '@ant-design/react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import HeaderDetailScreen from '../../../components/header/HeaderDetailScreen';

export default class ReplaceRunLegScreen extends Component{
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
            city:'',
            fullName:''
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
                <HeaderDetailScreen title={'代跑腿'} goBack={()=>{
                    this.onGoBaCK()
                }}></HeaderDetailScreen>
                <View style={styles.replaceRunLeg}>
                    <View style={styles.replaceRunLeg_top}>
                        <KeyboardAwareScrollView style={{padding:15}}>
                            <View style={styles.replaceRunLeg_top_item_userinfo}>
                                <View>
                                    <Text style={styles.replaceRunLeg_top_item_userinfo_address}>寝室宿舍楼9楼912</Text>
                                </View>
                                <View style={styles.replaceRunLeg_top_item_userinfo_mobile}>
                                    <View style={{flex:1}}>
                                        <Text>姓名：大地瓜</Text>
                                    </View>
                                    <View style={{flex:1}}>
                                        <Text style={{textAlign:'right'}}>电话：1888888888</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.replaceRunLeg_top_item_time}>
                                <View style={{flex:1}}>
                                    <Text>尽快送达</Text>
                                </View>
                                <View style={{flex:1}}>
                                    <Text style={{textAlign:'right'}}>大约12.23送达</Text>
                                </View>
                            </View>
                            <View style={styles.replaceRunLeg_top_item}>
                                <View style={styles.replaceRunLeg_top_item_DoWhat}>
                                    <Text>想让我帮你干嘛</Text>
                                </View>
                                <View style={styles.TextInputBox}>
                                    <TextInput
                                        maxLength={50}
                                        style={{minHeight: 100,fontSize:12,textAlignVertical: 'top',color:'#818181'}}
                                        onChangeText={(remark) => this.setState({remark})}
                                        multiline={true}
                                        clear
                                        editable={this.state.ButtonStatus!=='view'}
                                        placeholder="请输入备注"
                                        value={this.state.remark}
                                    />
                                </View>
                            </View>
                            <View style={styles.replaceRunLeg_top_item}>
                                <View style={styles.replaceRunLeg_top_item_DoWhat}>
                                    <Text>预估金额</Text>
                                </View>
                                <View style={styles.TextInputBox}>
                                    <TextInput
                                        clear
                                        style={{fontSize:12,color:'#818181',textAlign:'right',paddingTop:5,paddingBottom:5}}
                                        value={this.state.fullName}
                                        onChangeText={value => {
                                            this.setState({
                                                fullName:value
                                            });
                                        }}
                                        placeholder="预估金额"
                                        placeholderTextColor={'#ccc'}
                                    />
                                </View>
                            </View>
                            <View style={styles.replaceRunLeg_top_item}>
                                <View style={styles.replaceRunLeg_top_item_DoWhat}>
                                    <Text>备注</Text>
                                </View>
                                <View style={styles.TextInputBox}>
                                    <TextInput
                                        maxLength={50}
                                        style={{minHeight: 100,fontSize:12,textAlignVertical: 'top',color:'#818181'}}
                                        onChangeText={(remark) => this.setState({remark})}
                                        multiline={true}
                                        clear
                                        editable={this.state.ButtonStatus!=='view'}
                                        placeholder="请输入备注"
                                        value={this.state.remark}
                                    />
                                </View>
                            </View>
                            <View style={styles.replaceRunLeg_top_item}>
                                <View style={styles.replaceRunLeg_top_item_DoWhat}>
                                    <Text>跑腿费</Text>
                                </View>
                                <View style={styles.TextInputBox}>
                                    <TextInput
                                        clear
                                        style={{fontSize:12,color:'#818181',textAlign:'right',paddingTop:5,paddingBottom:5}}
                                        value={this.state.fullName}
                                        onChangeText={value => {
                                            this.setState({
                                                fullName:value
                                            });
                                        }}
                                        placeholder="预估金额"
                                        placeholderTextColor={'#ccc'}
                                    />
                                </View>
                            </View>
                            <View style={[styles.replaceRunLeg_top_item,{paddingBottom:15}]}>
                                <View style={styles.replaceRunLeg_top_item_DoWhat}>
                                    <Text>调度红包</Text>
                                </View>
                                <View style={styles.TextInputBox}>
                                    <TextInput
                                        clear
                                        style={{fontSize:12,color:'#818181',textAlign:'right',paddingTop:5,paddingBottom:5}}
                                        value={this.state.fullName}
                                        onChangeText={value => {
                                            this.setState({
                                                fullName:value
                                            });
                                        }}
                                        placeholder="预估金额"
                                        placeholderTextColor={'#ccc'}
                                    />
                                </View>
                            </View>
                        </KeyboardAwareScrollView>
                    </View>
                    <View style={styles.replaceRunLeg_footer}>
                        <View style={styles.replaceRunLeg_footer_left}>
                            <Text>跑腿费不含商品：<Text style={styles.money}>¥4</Text></Text>
                        </View>
                        <View style={styles.replaceRunLeg_footer_right}>
                            <Button >支付并提交订单</Button>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    replaceRunLeg:{
        flex:1,
        flexDirection:'column'
    },
    replaceRunLeg_top:{
        flex:1
    },
    replaceRunLeg_footer:{
        paddingBottom:30,
        borderTopWidth:1,
        borderColor:'#f4f4f4',
        borderStyle:'solid',
        paddingTop:15,
        flexDirection:'row',
        paddingLeft:15,
        paddingRight:15,
        alignItems:'center'
    },
    replaceRunLeg_footer_left:{
        flex:1
    },
    replaceRunLeg_footer_right:{

    },
    money:{
        fontSize:16,
        fontWeight:'600',
        color:'red'
    },
    TextInputBox:{
        borderWidth:1,
        borderColor:'#ccc',
        borderStyle:'solid',
        padding:5
    },
    replaceRunLeg_top_item:{

    },
    replaceRunLeg_top_item_userinfo:{
        borderStyle:'solid',
        borderColor:'#f4f4f4',
        borderBottomWidth:1
    },
    replaceRunLeg_top_item_userinfo_address:{
        fontSize:18
    },
    replaceRunLeg_top_item_userinfo_mobile:{
        flexDirection:'row',
        paddingTop:15,
        paddingBottom:15,
    },
    replaceRunLeg_top_item_time:{
        flexDirection:'row',
        paddingTop:15,
        paddingBottom:15,
        borderStyle:'solid',
        borderColor:'#f4f4f4',
        borderBottomWidth:1
    },
    replaceRunLeg_top_item_DoWhat:{
        paddingTop:15,
        paddingBottom:15,
    }
})

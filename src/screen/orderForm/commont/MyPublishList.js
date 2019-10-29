import React, {Component} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {ActivityIndicator} from '@ant-design/react-native';
export default class MyPublishList extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null, // 隐藏头部
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            tabStatus:0,
            total:0,
            dataTotal:12,
            data:[{},{},{},{},{},{},{},{},{},{},{},{}],
            refreshing: false,
        };
    }

    renderHeader = () => {
        return null;
    };

    renderFooter = () => {
        if (!this.state.loading){
            if(this.state.data.length===this.state.dataTotal){
                return (
                    <View style={{paddingTop:20}}>
                        <Text style={{color:'#ccc',fontSize:12,textAlign:'center',}}>数据加载完毕</Text>
                    </View>
                )
            }else{
                return null;
            }
        }else{
            return (
                <View
                    style={{
                        paddingVertical: 20,
                        borderTopWidth: 1,
                        borderColor: "#CED0CE"
                    }}
                >
                    <ActivityIndicator animating size="large" />
                </View>
            );
        }
    };

    handleRefresh=()=>{

    };

    handleLoadMore=()=>{

    };

    render(){
        return(
            <View  style={styles.content_box}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <TouchableOpacity>
                            <View style={styles.content_item}>
                                <View style={styles.content_item_left}>

                                </View>
                                <View style={styles.content_item_right}>
                                    <View>
                                        <Text  style={styles.content_item_right_top_title}>麻辣效果满30减25</Text>
                                    </View>
                                    <View style={styles.content_item_right_top_price}>
                                        <View style={styles.content_item_right_top_price_left}>
                                            <Text  style={styles.content_item_right_top_price_left_title}>¥12</Text>
                                        </View>
                                        <View style={styles.content_item_right_top_price_right}>
                                            <TouchableOpacity>
                                                <View  style={styles.content_item_right_top_price_right_title}>
                                                    <Text>查看详情</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.5}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    content_box:{
        flex: 1,
        backgroundColor:'#fff'
    },
    content_item:{
        flexDirection:'row',
        padding:15,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#f4f4f4',
        borderStyle:'solid',
        borderBottomWidth:1
    },
    content_item_left:{
        width:80,
        height:80,
        backgroundColor:'#f4f4f4'
    },
    content_item_right:{
        flex:1,
        paddingLeft:15,
    },
    content_item_right_top_price:{
        flexDirection:'row',
    },
    content_item_right_top_title:{
        lineHeight:40,
        fontSize:16
    },
    content_item_right_top_price_left:{

    },
    content_item_right_top_price_left_title:{
        color:'red',
        fontSize:14,
        fontWeight:'700'
    },
    content_item_right_top_price_right:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'flex-end',
    },
    content_item_right_top_price_right_title:{
        borderColor:'#ccc',
        borderStyle:'solid',
        borderWidth:1,
        padding:5,
        borderRadius:5
    }
})

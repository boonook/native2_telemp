import React, {Component} from 'react';
import {Text, View, Image, Dimensions,StyleSheet,TouchableOpacity,FlatList} from 'react-native';
import HeaderScreen from '../../components/header/HeaderScreen';
import {ActivityIndicator,Icon} from '@ant-design/react-native'
const {height,width} =  Dimensions.get('window');

export default class SchoolStyleScreen extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null, // 隐藏头部
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            dataTotal:4,
            data:[{},{},{},{}],
            refreshing: false,
        };
    };
    componentWillMount(){

    };
    componentDidMount(){

    };

    viewPartyList=(data)=>{

    }

    renderHeader = () => {
        return <View style={styles.image_box}>
            <Image style={{width: '100%', height:160}} source={require('../../assets/images/heyi.jpg')}/>
            <View style={styles.heyi_top}>
                <Image  style={{width:60, height:60}} source={require('../../assets/images/heyi_top.jpg')}/>
            </View>
        </View>;
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
        return (
            <View style={{flex:1}}>
                <HeaderScreen title={'校园风采'} headerRightStatus={true} headerRightTitle={'发布'}/>
                <View style={{flex:1}}>
                    <View style={{flex:1}}>
                        <View style={{flex:1}}>
                            <FlatList
                                data={this.state.data}
                                renderItem={({ item }) => (
                                    <TouchableOpacity

                                    >
                                        <View style={styles.content_item}>
                                            <View style={styles.content_item_left}>

                                            </View>
                                            <View style={styles.content_item_right}>
                                                <View style={styles.content_item_right_top}>
                                                    <Text style={styles.content_item_right_top_title}>剪头发了</Text>
                                                </View>
                                                <View>
                                                    <View style={styles.content_item_right_content_img}>

                                                    </View>
                                                </View>
                                                <View style={styles.content_item_right_footer}>
                                                    <View style={styles.content_item_right_footer_left}>
                                                        <Text style={styles.content_item_right_footer_title}>林荫小道</Text>
                                                    </View>
                                                    <View style={styles.content_item_right_footer_right}>
                                                        <Text>
                                                            <Text><Icon name="heart"  size={18} color="#999" /></Text>
                                                            <Text style={{marginLeft:15}}><Icon size={18} name="message" color="#999" /></Text>
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View>
                                                    <View>
                                                        <Text style={styles.content_item_message}>北大李荣浩：真好看</Text>
                                                    </View>
                                                    <View>
                                                        <Text style={styles.content_item_message}>淑芬：真好看</Text>
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
                    </View>
                </View>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    image_box:{
      position:'relative',
      width:'100%',
      height:150,
      backgroundColor:'#f4f4f4',
      marginBottom:50
    },
    heyi_top:{
        width:70,
        height:70,
        backgroundColor:'#f4f4f4',
        padding:5,
        position:'absolute',
        right:10,
        bottom:-40,
        zIndex:9999999,
        borderStyle:'solid',
        borderColor:'#999',
        borderWidth:1
    },
    content_item:{
        flexDirection:'row',
        padding:15
    },
    content_item_left:{
        width:60,
        height:60,
        backgroundColor:'#f4f4f4'
    },
    content_item_right:{
        flex:1,
        marginLeft:15
    },
    content_item_right_top:{
        lineHeight:30
    },
    content_item_right_content_img:{
        width:'100%',
        height:150,
        backgroundColor:'#f4f4f4'
    },
    content_item_right_footer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#f4f4f4',
        borderStyle:'solid',
        borderBottomWidth:1
    },
    content_item_right_footer_title:{
        fontSize:12,
        lineHeight:30
    },
    content_item_right_footer_left:{

    },
    content_item_right_footer_right:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'flex-end',
    },
    content_item_message:{
        lineHeight:24,
        fontSize:12
    },
    content_item_right_top_title:{
        lineHeight:30
    }
})

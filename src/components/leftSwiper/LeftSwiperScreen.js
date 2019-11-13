import React, {Component} from 'react';
import {Text, View,StyleSheet} from 'react-native';
import HeaderDetailScreen from '../header/HeaderDetailScreen';
import { SwipeListView } from 'react-native-swipe-list-view';

export default class LeftSwiperScreen extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null, // 隐藏头部
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            listViewData:[{item:1,key:1},{item:1,key:2},{item:1,key:3},{item:1,key:4},{item:1,key:5},{item:1,key:6}]
        };
    };
    componentWillMount(){

    };
    componentDidMount(){

    };

    onGoBaCK=()=>{
        this.props.navigation.goBack();
    };

    render(){
        return (
            <View>
                <HeaderDetailScreen title={'左侧滑动'} goBack={()=>{
                    this.onGoBaCK()
                }}/>
                <View>
                    <SwipeListView
                        data={this.state.listViewData}
                        closeOnRowOpen
                        closeOnRowBeginSwipe
                        renderItem={ (data, index) => (
                            <View key={index} style={styles.rowFront}>
                                <Text>I am boonook in a SwipeListView</Text>
                            </View>
                        )}
                        renderHiddenItem={ (data, rowMap) => (
                            <View style={styles.rowBack}>
                                <View style={{flexDirection:'row'}}>
                                    <Text>left</Text>
                                </View>
                               <View style={{flexDirection:'row'}}>
                                   <View style={{backgroundColor:'red',color:'#fff',height:50,}}>
                                       <Text>删除</Text>
                                   </View>
                                   <View style={{backgroundColor:'green',color:'#fff',height:50,}}>
                                       <Text>提交</Text>
                                   </View>
                               </View>
                            </View>
                        )}
                        leftOpenValue={75}
                        rightOpenValue={-75}
                    />
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    drawerBox:{
        height:100,
        backgroundColor:'#f4f4f4'
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        textAlign:'center'
    },
    rowFront: {
        backgroundColor: '#fff',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
})

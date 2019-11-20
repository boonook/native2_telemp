import React, {Component} from 'react';
import {Text, View,StyleSheet,TouchableOpacity} from 'react-native';
import HeaderDetailScreen from '../header/HeaderDetailScreen';
import { SwipeListView } from 'react-native-swipe-list-view';
import {Modal,Provider} from '@ant-design/react-native';

export default class LeftSwiperScreen extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null, // 隐藏头部
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            listViewData:[{item:1,key:1},{item:1,key:2},{item:1,key:3},{item:1,key:4},{item:1,key:5},{item:1,key:6}],
            data:null,
            rowMap:null
        };
    };
    componentWillMount(){

    };
    componentDidMount(){

    };

    onGoBaCK=()=>{
        this.props.navigation.goBack();
    };

    onDel=(data, rowMap)=>{
        this.setState({
            visible:true,
            data,
            rowMap
        });
    };

    onClose=()=>{
        this.setState({
            visible: false
        });
    };

    onClearSpaceSure=()=>{
        if (this.state.rowMap[this.state.data.item.key]) {
            this.state.rowMap[this.state.data.item.key].closeRow();
            this.onClose()
        }
    }

    render(){
        return (
            <Provider>
                <View>
                    <HeaderDetailScreen title={'左侧滑动'} goBack={()=>{
                        this.onGoBaCK()
                    }}/>
                    <View>
                        <SwipeListView
                            data={this.state.listViewData}
                            closeOnRowOpen
                            closeOnRowBeginSwipe
                            disableRightSwipe={true} //禁止右滑
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
                                       <TouchableOpacity onPress={()=>{
                                           this.onDel(data, rowMap)
                                       }}>
                                           <View style={{color:'#fff',backgroundColor:'red',height:50,width:75}}>
                                               <Text style={{color:'#fff'}}>删除</Text>
                                           </View>
                                       </TouchableOpacity>
                                       <TouchableOpacity onPress={(data, rowMap)=>{
                                           this.onClose()
                                       }}>
                                           <View style={{color:'#fff',backgroundColor:'green',height:50,width:75}}>
                                               <Text style={{color:'#fff'}}>提交</Text>
                                           </View>
                                       </TouchableOpacity>
                                   </View>
                                </View>
                            )}
                            leftOpenValue={150}
                            rightOpenValue={-150}
                        />
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

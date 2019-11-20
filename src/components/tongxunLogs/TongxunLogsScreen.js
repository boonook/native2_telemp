import React, {Component} from 'react';
import {View,StyleSheet,TouchableOpacity,Text} from 'react-native';
import HeaderDetailScreen from '../header/HeaderDetailScreen';
import {call} from '../../utils/tools'

export default class TongxunLogsScreen extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null, // 隐藏头部
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
        };
    };

    componentWillMount() {

    }

    callMerchant = () => {
        call('18888888888');
    };

    onGoBaCK=()=>{
        this.props.navigation.goBack();
    };

    render(){
        return (
            <View style={styles.container}>
                <HeaderDetailScreen title={'通讯录'} goBack={()=>{
                    this.onGoBaCK()
                }}/>
                <TouchableOpacity onPress={()=>{
                    this.callMerchant()
                }}>
                    <View>
                        <Text>拨打电话</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    drawerBox:{
        height:100,
        backgroundColor:'#f4f4f4'
    }
});

import React, {Component} from 'react';
import {Text, View,StyleSheet} from 'react-native';
import HeaderDetailScreen from '../header/HeaderDetailScreen';

export default class FilesManageScreen extends Component{
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

    onGoBaCK=()=>{
        this.props.navigation.goBack();
    };

    render(){
        return (
            <View>
                <HeaderDetailScreen title={'文件管理'} goBack={()=>{
                    this.onGoBaCK()
                }}/>
                <Text>文件管理</Text>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    drawerBox:{
        height:100,
        backgroundColor:'#f4f4f4'
    }
})

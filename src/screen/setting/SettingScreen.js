import React, {Component} from 'react';
import {Text, View,StyleSheet} from 'react-native';

export default class SettingScreen extends Component{
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
    render(){
        return (
            <View>
                <View style={styles.drawerBox}>

                </View>
                <Text>设置111</Text>
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

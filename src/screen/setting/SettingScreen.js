import React, {Component} from 'react';
import {Text, View} from 'react-native';

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
                <Text>设置</Text>
            </View>
        )
    }
}

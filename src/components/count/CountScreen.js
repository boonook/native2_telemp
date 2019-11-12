import React, {Component} from 'react';
import {Text, View,StyleSheet} from 'react-native';
import HeaderDetailScreen from '../header/HeaderDetailScreen';

export default class CountScreen extends Component{
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
            <View style={styles.countBox}>
                <HeaderDetailScreen title={'统计'} goBack={()=>{
                    this.onGoBaCK()
                }}/>
                <Text>统计图</Text>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    countBox:{
        flex:1
    }
})

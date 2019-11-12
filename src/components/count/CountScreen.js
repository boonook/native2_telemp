import React, {Component} from 'react';
import {Text, View,StyleSheet} from 'react-native';
import HeaderDetailScreen from '../header/HeaderDetailScreen';
import Echarts from 'native-echarts';
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
        const option = {
            title: {
                text: 'ECharts demo'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        return (
            <View style={styles.countBox}>
                <HeaderDetailScreen title={'统计'} goBack={()=>{
                    this.onGoBaCK()
                }}/>
               <View style={styles.echartsBox}>
                   <Echarts option={option} height={300} />
               </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    countBox:{
        flex:1
    },
    echartsBox:{
        flex:1
    }
})

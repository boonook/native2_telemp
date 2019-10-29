import React, {Component} from 'react';
import {View} from 'react-native';
import { Tabs,Provider } from '@ant-design/react-native';
import HeaderScreen from '../../components/header/HeaderScreen';
import MyReceivelist from './commont/MyReceivelist';
import MyPublishList from './commont/MyPublishList';
export default class OrderFormScreen extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null, // 隐藏头部
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            tabStatus:0,
            total:0
        };
    }

    _onTabClick=(data)=>{
        switch (data.title) {
            case '我发的订单':
                this.setState({
                    tabStatus:0
                });
                break;
            case '我接的订单':
                this.setState({
                    tabStatus:1
                });
                break;
        }
    }

    render(){

        const tabs = [
            { title: '我发的订单' },
            { title: '我接的订单' }
        ];

        const style = {
            height: 150,
            backgroundColor: '#f8f7f3',
            flex:1
        };

        return(
            <Provider>
                <View  style={{ flex: 1 }}>
                    <HeaderScreen title={'订单列表'}/>
                    <View  style={{ flex: 1 }}>
                        <Tabs  tabBarInactiveTextColor={'#818181'} swipeable={false} usePaged={false} tabs={tabs} onTabClick={(data)=>{this._onTabClick(data)}} tabBarUnderlineStyle={{backgroundColor:'#E22038'}}>
                            <View style={style}>
                                {this.state.tabStatus+''==='0'?<MyPublishList></MyPublishList>:null}
                            </View>
                            <View style={style}>
                                {this.state.tabStatus+''==='1'?<MyReceivelist></MyReceivelist>:null}
                            </View>
                        </Tabs>
                    </View>
                </View>
            </Provider>
        )
    }
}

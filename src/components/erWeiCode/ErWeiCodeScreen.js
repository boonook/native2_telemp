import React, {Component} from 'react';
import {
    StyleSheet,
    PermissionsAndroid,
    View,
    Text
} from 'react-native';
import HeaderScreen from '../header/HeaderScreen';
import HeaderDetailScreen from '../header/HeaderDetailScreen';

export default class ErWeiCodeScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: () => null, // 隐藏头部
        }
    };

    constructor(props) {
        super(props);
        this.state = {

        };
        this.requestCameraPermission = this.requestCameraPermission.bind(this)
    };

    componentWillMount(){
        this.requestCameraPermission();
    }

    componentDidMount() {

    }

    onClose = () => {

    };

    ///请求权限的方法
    async requestCameraPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: '申请摄像头权限',
                    message:
                        '一个很牛逼的应用想借用你的摄像头，' +
                        '然后你就可以拍出酷炫的皂片啦。',
                    buttonNeutral: '等会再问我',
                    buttonNegative: '不行',
                    buttonPositive: '好吧',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('现在你获得摄像头权限了');
            } else {
                console.log('用户并不屌你');
                this.props.navigation.goBack()
            }
        } catch (err) {
            console.warn(err);
        }
    }

    onGoBaCK=()=>{
        this.props.navigation.goBack();
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <HeaderDetailScreen title={'扫描二维码'}  goBack={()=>{
                    this.onGoBaCK()
                }}/>
                <View style={{flex:1}}>
                    <Text>扫描二维码</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rectangleText:{

    }
})

import React, {Component} from 'react';
import {Text, View,StyleSheet,StatusBar, Dimensions, Platform,TouchableOpacity} from 'react-native';
import {Icon} from '@ant-design/react-native'
export let screenW = Dimensions.get('window').width;
export let screenH = Dimensions.get('window').height;
// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;

/**
 * 判断是否为iphoneX
 * @returns {boolean}
 */
export function isIphoneX() {
    return (
        Platform.OS === 'ios' &&
        ((screenH === X_HEIGHT && screenW === X_WIDTH) ||
            (screenH === X_WIDTH && screenW === X_HEIGHT))
    )
}

export default class HeaderDetailScreen extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null, // 隐藏头部
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            headerStyle:{},
            headerRightStatus:false,
            headerRightTitle:null
        };
    }

    componentDidMount() {
        if (isIphoneX()) {
            this.setState({
                headerStyle:styles.headeriIos
            })
        } else if (Platform.OS === 'ios') {
            this.setState({
                headerStyle:styles.headerNoIos
            })
        } else {
            this.setState({
                headerStyle:styles.header
            })
        }
        if(this.props.headerRightStatus===undefined){
            this.setState({
                headerRightStatus:false,
                headerRightTitle:null
            })
        }else{
            this.setState({
                headerRightStatus:true,
                headerRightTitle:this.props.headerRightTitle
            })
        }
    }

    ///返回商机
    goBack=()=>{
        this.props.goBack();
    }

    render(){
        return(
            <View>
                <StatusBar backgroundColor={'#fff'} barStyle="dark-content"/>
                <View style={this.state.headerStyle}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity style={{alignSelf:'flex-start',marginLeft:10}}>
                            <Icon onPress={()=>{
                                this.goBack();
                            }} style={[styles.headerIcon,{padding:5}]} name={'left'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.flex1}>
                        <Text style={styles.title}>{this.props.title}</Text>
                    </View>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity>
                            {this.state.headerRightStatus?<Text style={styles.title_right}>{this.state.headerRightTitle}</Text>:null}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height:50,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomColor:'#f4f4f4',
        borderBottomWidth:1,
        borderStyle:'solid',
        alignItems:'center',
    },
    headerNoIos: {
        height:80,
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingTop:20,
        borderBottomColor:'#f4f4f4',
        borderBottomWidth:1,
        borderStyle:'solid',
        alignItems:'center',
    },
    headeriIos:{
        height:80,
        flexDirection: 'row',
        alignItems:'center',
        backgroundColor: '#fff',
        paddingTop:30,
        borderBottomColor:'#f4f4f4',
        borderBottomWidth:1,
        borderStyle:'solid'
    },
    flex1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    title: {
        fontSize: 20,
        color: '#444'
    },
    title_right:{
        fontSize:14,
        color: '#444'
    },
    add: {
        fontSize: 18,
        color: '#444',
    },
    statusBar:{
        color: 'red'
    },
    headerLeft:{
        width:50,
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center'
    },
    headerIcon:{
        fontSize: 20,
        color: '#444',
    }
});

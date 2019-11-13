import React, {Component} from 'react';
import {Text, View, StyleSheet, StatusBar, Dimensions, Platform, TouchableOpacity, Image} from 'react-native';
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

export default class HeaderScreen extends Component{
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
            headerRightTitle:null,
            headerLeftStatus:false
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
        if(this.props.headerLeftStatus===undefined){
            this.setState({
                headerLeftStatus:false,
            })
        }else{
            this.setState({
                headerLeftStatus:true,
            })
        }
    }

    openDrawerNavigator=()=>{
        this.props.openDrawerNavigator();
    }

    render(){
        return(
            <View>
                <StatusBar backgroundColor={'#fff'} barStyle="dark-content"/>
                <View style={this.state.headerStyle}>
                    <View style={styles.headerLeft}>
                        {this.state.headerLeftStatus? <TouchableOpacity onPress={()=>{
                            this.openDrawerNavigator()
                        }}>
                            <View style={styles.img_box}>
                                <Image style={{width:30, height:30}} source={require('../../assets/images/heyi.jpg')}/>
                            </View>
                        </TouchableOpacity>:null}
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
        fontSize: 16,
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
    img_box:{
        width:30,
        height:30,
        borderRadius:15,
        overflow:'hidden'
    }
});

import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';
import {Icon} from '@ant-design/react-native'
import {showImagePicker} from '../../utils/tools'
import HeaderDetailScreen from '../header/HeaderDetailScreen';

const {height,width} =  Dimensions.get('window');
export default class MoreImgUploadScreen extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null, // 隐藏头部
        }
    };
    constructor(props) {
        super(props);
        this.state = {
           imgList:[]
        };
    };
    componentWillMount(){

    };
    componentDidMount(){

    };

    onGoBaCK=()=>{
        this.props.navigation.goBack();
    };

    ///上传文件
    onUpload=()=>{
        showImagePicker().then(res=>{
            this.state.imgList.push(res);
            this.setState({
                imgList:this.state.imgList
            })
        });
    };

    render(){
        return (
            <View style={styles.moreImgUploadBox}>
                <HeaderDetailScreen title={'多图片上传'}  goBack={()=>{
                    this.onGoBaCK()
                }}/>
                <View style={styles.moreImgUploadBoxContent}>
                    {this.state.imgList.length>0?<View style={styles.moreImgUploadBoxContentBox}>
                        {this.state.imgList.map((item,index)=>{
                            return (
                                <View style={styles.moreImgUploadBoxContentBoxItem} key={index}>
                                    <Image style={styles.avatar} source={{uri:item.uri}}/>
                                </View>
                            )
                        })}
                    </View>:null}
                    <View style={styles.uploadBtn}>
                        <TouchableOpacity onPress={()=>{
                            this.onUpload()
                        }}>
                            <View style={styles.onUploadBox}>
                                <Icon name="plus" size={40} color="green" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    moreImgUploadBox:{
        flex:1,
    },
    moreImgUploadBoxContent:{
        backgroundColor:'#f4f4f4',
        flex:1,
        padding:15
    },
    onUploadBox:{
        width:80,
        height:80,
        borderColor:'green',
        borderStyle:'solid',
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5
    },
    avatar: {
        borderRadius:5,
        width:width/4-10,
        height:width/4-10,
    },
    moreImgUploadBoxContentBox:{
        flexDirection:'row',
        flexWrap:'wrap',
    },
    moreImgUploadBoxContentBoxItem:{
        width:(width-30)/4,
        justifyContent:'center',
        alignItems: 'center',
        marginBottom:15
    },
    uploadBtn:{

    }
})

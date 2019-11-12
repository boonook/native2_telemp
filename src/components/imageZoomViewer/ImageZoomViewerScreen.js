import React, {Component} from 'react';
import {Text, View, StyleSheet, CameraRoll, Modal, Dimensions} from 'react-native';
import {ActivityIndicator,Provider} from '@ant-design/react-native';
import HeaderDetailScreen from '../header/HeaderDetailScreen';
import ImageViewer from 'react-native-image-zoom-viewer';
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default class ImageZoomViewerScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: () => null, // 隐藏头部
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            modalVisible:true,
            curentImage:1,
            animating: true,
            imaeDataUrl:[
                'http://b-ssl.duitang.com/uploads/blog/201312/04/20131204184148_hhXUT.jpeg',
                'http://b-ssl.duitang.com/uploads/blog/201401/07/20140107171234_3W2RC.jpeg',
                'http://b-ssl.duitang.com/uploads/item/201806/05/20180605182854_vkcpq.jpg',
                'http://image2.sina.com.cn/ent/d/2005-06-21/U105P28T3D758553F326DT20050621155942.jpg'
            ]
        };
        this.renderLoad = this.renderLoad.bind(this);
        this.savePhoto = this.savePhoto.bind(this);
        this._Close= this._Close.bind(this);
    };

    _Close() {
        this.setState({
            modalVisible:false
        },()=>{
            this.props.navigation.goBack();
        })
    }
    renderLoad() { //这里是写的一个loading
        return (
            <View style={{ marginTop: (screenHeight / 2) - 20 }}>
                <ActivityIndicator animating={this.state.animating} size={"large"} />
            </View>
        )
    }
    savePhoto() {
        let index = this.state.curentImage;
        let url = this.state.imaeDataUrl[index];
        let promise = CameraRoll.saveToCameraRoll(url);
        promise.then(function (result) {
            alert("已保存到系统相册")
        }).catch(function (error) {
            alert('保存失败！\n' + error);
        });
    }

    componentWillMount() {

    };

    componentDidMount() {

    };

    onClose = () => {
        this.props.navigation.goBack();
    };

    goBack=()=>{
        this.props.navigation.goBack();
    };

    render() {
        let imageData = this.state.imaeDataUrl;
        // let IsArray = Array.isArray(this.props.imaeDataUrl)
        let ImageObjArray = [];
        for (let i = 0; i < imageData.length; i++) {
            let Obj = {};
            Obj.url = imageData[i];
            ImageObjArray.push(Obj)
        }
        return (
            <Provider>
                <View style={{flex:1}}>
                    {/*<HeaderDetailScreen goBack={this.goBack} title={'图片预览'}/>*/}
                    <View style={{ flex:1,position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}>
                        <Modal
                            animationType={"slide"}
                            transparent={true}
                            visible={this.state.modalVisible}
                            //    onRequestClose={() => { this._pressSignClose() }}
                        >
                            {/*<ImageViewer*/}
                            {/*    imageUrls={ImageObjArray} // 照片路径*/}
                            {/*    enableImageZoom={true} // 是否开启手势缩放*/}
                            {/*    saveToLocalByLongPress={true} //是否开启长按保存*/}
                            {/*    index={this.state.curentImage} // 初始显示第几张*/}
                            {/*    // failImageSource={} // 加载失败图片*/}
                            {/*    loadingRender={this.renderLoad}*/}
                            {/*    enableSwipeDown={false}*/}
                            {/*    menuContext={{ "saveToLocal": "保存图片", "cancel": "取消" }}*/}
                            {/*    onChange={(index) => { }} // 图片切换时触发*/}
                            {/*    onClick={() => { // 图片单击事件*/}
                            {/*        this._Close()*/}
                            {/*    }}*/}
                            {/*    onSave={(url) => { this.savePhoto(url) }}*/}

                            {/*/>*/}
                            <Modal visible={true} transparent={true}>
                                <ImageViewer onClick={()=>{this._Close()}}  menuContext={{ "saveToLocal": "保存图片", "cancel": "取消" }} enableImageZoom={true} saveToLocalByLongPress={true} index={1} imageUrls={ImageObjArray}/>
                            </Modal>

                        </Modal>

                    </View>
                </View>
            </Provider>
        )
    }
}

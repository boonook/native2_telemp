import React, {Component} from 'react';
import {View} from 'react-native';
import {CachedImage} from "react-native-img-cache";

class CachedImage extends Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    };
    componentWillMount(){

    };
    componentDidMount(){
        console.log(this);
        debugger
    };

    render(){
        return (
            <View>
                <CachedImage {...this.props}/>
            </View>
        )
    }
}

export default CachedImage;


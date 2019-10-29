import React,{Component} from 'react';
import Url from "./Router";
import initModels from './modles/index';
import {Provider} from 'react-redux'
import {create} from 'dva-core';

// NativeModules.RNTTS.speak('欢迎使用智慧党建系统',()=>{});
console.log("------------->end<-------------");
const DvaApp = create({
    onError: function (e) {
        console.log('app have catch a error:', e);

    },
});

initModels(DvaApp);
DvaApp.start();
export default class App extends Component{
    render(){
        return (
            <Provider store={DvaApp._store}>
                <Url/>
            </Provider>
        )
    }
}

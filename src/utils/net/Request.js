import {Platform, StatusBar} from 'react-native'
import DeviceInfo from 'react-native-device-info'
import {Toast} from '@ant-design/react-native'
import {connect} from 'react-redux'
import {isEmpty} from '../tools'

import api from "./Api";

const uniqueId = (() => {
    return DeviceInfo.getUniqueId().replace(/-/g, '_');
})();

let vs = null;
const reloginCode = [401,];
export const Api = api;

export interface RequestResponse {
    code: number,
    message: string,
    data: any
}

const log = (...args) => {
    console.log(...args)
};

let errcb = null;

@connect(({auth})=>({auth}))
export default class Request {
    static debug = false;
    static init(params) {
        if (!params) return;
        if (typeof params === 'object') {
            if (params.hasOwnProperty('errorCallBack')) {
                errcb = params['errorCallBack']
            }
        }
    };

    /**
     * 向网络请求参数中注入 设备信息
     * @param params
     * @returns {*}
     */
    static enject(params) {
        if (params === null || params === undefined) {
            params = {};
            params["deviceId"] = uniqueId;
            params["deviceOs"] = Platform.OS;
            return params;
        }
        if (typeof params === 'string') return params;
        if (Array.isArray(params)) return params;
        if (typeof params === 'object') {
            params["deviceId"] = uniqueId;
            params["deviceOs"] = Platform.OS;
            return params;
        }
        return params
    };


    //手动控制请求超时
    static timeout(promise: Promise<any>, ms = 300 * 100) {
        if (ms <= 0) return promise;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('网络请求超时!'))
            }, ms);
            return promise.then(resolve, reject)
        })
        return promise;
    };

    //设置ios段网络活动标识
    static setNetworkActivityIndicatorVisible(active) {
        if (Platform.OS === 'ios') {
            StatusBar.setNetworkActivityIndicatorVisible(active);
        }
    }


    /**
     * 拼接请求头
     * @param headers

     * @return {{timestamp: any}}
     */
    static makeHeaders(headers = {"Content-Type": 'application/json'}) {
        let _h = {...headers};
        if (Request.isEmpty(_h['Content-Type'])) {
            _h['Content-Type'] = 'application/json';

        }
        _h['platform'] = Platform.OS
        return _h;
    };
    static makeFormData(params) {
        if(params.fileEntityList!==undefined){
            params.fileEntityList.map((item,index)=>{
                if (item.type === "application/octet-stream") {
                    params.fileEntityList.splice(index,1)
                }
            })
        }
        if (!params) return new FormData();
        if (typeof params !== "object") return new FormData();
        let formData = new FormData();
        Object.keys(params).forEach(k => {
            if (params.hasOwnProperty(k) && !isEmpty(params[k])) {
                ///如果需要添加到表单的值是数组
                if (Array.isArray(params[k]) && !isEmpty(params[k])) {
                    params[k].forEach((i, index) => {
                        ///如果是文件 直接添加到formDate
                        if (i.type === "application/octet-stream") {
                            formData.append(k, i);
                        }
                        ///如果是对象 需要转换为 form字段[数组下标].对象的key 这个形式的key再添加到formData
                        else if (typeof i === 'object') {
                            Object.keys(i).forEach(kk => {
                                formData.append(`${k}[${index}].${kk}`, i[kk]);
                            });
                        } else {
                            formData.append(k, i)
                        }
                    });
                }
                ///如果需要添加到表单的是对象
                else if(params[k].type == "application/octet-stream"){
                    formData.append(k,params[k]);
                }
                else if (typeof params[k] === 'object') {
                    Object.keys(params[k]).forEach(kk => {
                        formData.append(`${k}.${kk}`, params[k][kk]);
                    });
                } else {
                    formData.append(k, params[k]);
                }
            }
        });
        return formData;
    }
    /**
     * 检查对象是否为空  ''，'  '，[],{},...,都默认为空对象
     * @param obj
     * @returns {boolean}
     */
    static isEmpty(obj) {
        if (obj === null) return true;
        if (obj === undefined) return true;
        if (typeof obj === 'string') {
            _obj = obj.trim();
            return _obj.length <= 0
        }
        if (Array.isArray(obj)) {
            return obj.length <= 0
        }
        if (typeof obj === 'object') {
            return Object.keys(obj).length <= 0
        }
        return false

    };

    /**
     * 根据请求头 生成请求参数
     * @param params
     * @param headers
     * @returns {string}
     */
    static getParamsWithHeaders = (params, headers) => {
        let isJsonParams = false;
        let body = "";
        try {
            isJsonParams = headers.get("Content-Type") === 'application/json'
        } catch (error) {
            isJsonParams = false
        }
        if (!Request.isEmpty(params)) {
            if (typeof params === 'string') {
                body = params;
            } else {
                let newParams = {...params};
                if (isJsonParams) {
                    for (let key in params) {
                        if (!params.hasOwnProperty(key)) {
                            delete newParams[key]
                        }
                        if (Request.isEmpty(params[key])) {
                            delete newParams[key]
                        }
                    }
                    body = JSON.stringify(newParams);
                } else {
                    body = Request.makeFormData(params);
                }
            }
        }
        return body
    };


    static log(...param) {
        log(param);
        return param;
    };

    //检查响应
    static checkResponse(response) {
        console.log(vs)
        log('-----------checkResponse-----------');
        Request.setNetworkActivityIndicatorVisible(false);
        if (response.ok === true) {
            return response.json()
        } else {
            if (response.status + '' === '403') {
                let error = new Error();
                error.message = '授权信息无效,请重新登录';
                error.code = 403;
                throw error
            }
            let error = new Error();
            error.code = Number(response.status);
            return response.json()
                .then(data => {
                    if (data.error) {
                        error.message = data.error.replace('java.lang.Exception:', '');
                    } else {
                        error.message = '请求失败';
                    }
                    throw error
                });
        }
    };

    //检查返回状态码
    static checkCode(response) {
        log('-----------checkCode-----------');
        log(response);
        const code = Number(response.code);
        if (reloginCode.indexOf(code) !== -1) {
            let error = new Error();
            error.message = response.msg.replace('java.lang.Exception:', '');
            error.code = response.code;
            throw error
        } else {
            if (code !== 200) {
                let error = new Error();
                error.message = response.msg.replace('java.lang.Exception:', '');
                error.code = response.code;
                if(vs===null||vs===''||vs===undefined){
                    throw error;
                }else{
                    if(response.code+''==='4'||response.code+''==='2'||response.code+''==='3'||response.msg==='登录超时，请重新登录'||response.msg==='用户登录登陆超时'){
                        Toast.fail('登陆超时，即将退出', 0.8);
                        vs.props.dispatch({
                            type:'auth/logOut',
                            payload:{
                                callback:()=>{
                                    vs.props.navigation.navigate("Login");
                                }
                            }
                        })
                    }
                }
                throw error;
            }
            return {
                ...response,
                code: code,
                message: response.msg,
                extra: null
            }
        }
    }

    /**
     * 打印错误
     * @param error
     * @param {any} api
     * @return {{code: number; msg: string | any}}
     */
    static logError(error) {
        log('请求错误', error);
        if (error.message) {
            Toast.fail(error.message.replace('java.lang.Exception:', ''), 0.8, () => {
                errcb && errcb(error);
            });
        } else {
            Toast.fail(error.message, 0.8, () => {
                errcb && errcb(error);
            });
        }

        return {
            code: 0,
            msg: error.message,
        };
    }


    /**
     *
     * @param params
     * @return {*}
     */
    static makeQueryString(params) {
        if (!params) return null;
        let keys = Object.keys(params);
        const newArr = keys.sort((s1, s2) => s1 > s2);
        const ifFilter = (k) => {
            if (!params.hasOwnProperty(k)) return false;
            if (params[k] === null || params[k] === 'undefined') return false;
            if (typeof params[k] === 'string' && params[k].length === 0) return false;
            if (Array.isArray(params[k]) && params[k].length <= 0) return false;
            if (typeof params[k] === 'object' && Object.keys(params[k]).length <= 0) return false;
            return true
        };
        const _a = newArr.filter(ifFilter);
        if (_a && _a.length > 0) {
            return _a.map((v) => (`${v}=${params[v]}`)).join('&')
        }
        return null;
        // let queryString = newArr.filter(ifFilter).map((v) => (`${v}=${params[v]}`)).join('&');
        // return queryString;
    }

    static post = (url, params, h = null, formData,vm=null) => {
        const apiUrl = Api.Request_url + url;
        vs = vm;
        if (formData) {
            h = {
                ...h,
                "Content-Type": 'multipart/form-data'
            }
        }
        const headers = Request.makeHeaders(h);
        let body = Request.getParamsWithHeaders(params, headers, formData);
        Request.setNetworkActivityIndicatorVisible(true);
        return Request.timeout(fetch(apiUrl, {
            method: 'POST',
            body,
            headers
        })).then(Request.checkResponse)
            .then(Request.checkCode)
            .catch(e => {
                Toast.fail(`api:${apiUrl} \n error:${JSON.stringify(e)}`)
            });
    };
    static get = (url, params, h,vm=null) => {
        vs = vm;
        let apiUrl = Api.Request_url + url;
        let queryString = Request.makeQueryString(params);
        if (queryString) {
            queryString = `?${decodeURIComponent(queryString)}`
        } else {
            queryString = ''
        }
        apiUrl = apiUrl + queryString;
        const headers = Request.makeHeaders(h);
        Request.setNetworkActivityIndicatorVisible(true);
        log('-------------->get<---------');
        log(apiUrl);
        log(headers);
        return Request.timeout(fetch(apiUrl, {
            method: 'GET',
            headers,
        })).then(Request.checkResponse)
            .then(Request.checkCode)
            .catch(Request.logError)
    };
    static put = (url, params, h, formData,vm=null) => {
        const apiUrl = Api.Request_url + url;
        vs = vm;
        if (formData) {
            h = {
                ...h,
                "Content-Type": 'multipart/form-data'
            }
        }
        let headers = Request.makeHeaders(h);
        let body = Request.getParamsWithHeaders(params, headers, formData);
        Request.setNetworkActivityIndicatorVisible(true);
        return Request.timeout(fetch(apiUrl, {
            method: 'PUT',
            body,
            headers
        })).then(Request.checkResponse)
            .then(Request.checkCode)
            .catch(Request.logError)
    };
    static del = (url, params, h,vm=null) => {
        vs = vm;
        const apiUrl = Api.Request_url + url;
        const headers = Request.makeHeaders(h);
        const body = Request.getParamsWithHeaders(params, headers);
        Request.setNetworkActivityIndicatorVisible(true);
        return Request.timeout(fetch(apiUrl, {
            method: 'DELETE',
            body,
            headers
        })).then(Request.checkResponse)
            .then(Request.checkCode)
            .catch(Request.logError)
    };
    static patch = (url, params, h) => {
        const apiUrl = Api.Request_url + url;
        const headers = Request.makeHeaders(h);
        const body = Request.getParamsWithHeaders(params, headers);
        Request.setNetworkActivityIndicatorVisible(true);
        return Request.timeout(fetch(apiUrl, {
            method: 'PATCH',
            body,
            headers
        })).then(Request.checkResponse)
            .then(Request.checkCode)
            .catch(Request.logError)
    };

    static checkImageUrl(src) {
        if (!src) return '';
        let _src = '';
        if (src.toLocaleLowerCase().indexOf('http') === -1) {
            _src = Api.Request_url + '/' + src;
        }

        console.log('checkImageUrl', _src);
        return _src;
    }
}

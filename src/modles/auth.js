import {AsyncStorage} from "react-native";
import Request, {Api} from '../utils/net/Request'
const STORAGE_KEY = "auth";
export default {
    namespace: STORAGE_KEY,
    state: {
        //是否登录
        isLogin: false,
        loading: false,
        token: null,
        loginInfo:{
            rememberUserNameStatus:false,
            userName:'',
            userPwd:''
        },
        menuPromiss:null,
        userInfo: null,

        ///积分列表
        scoreList:null,

        //我的活动
        myLife:null,

        //我的汇报
        myReport:null,

        //我的签到
        myAttendance:null,


        //关系转移列表
        transferList:null,

    },
    subscriptions: {
        setup({dispatch}) {
            dispatch({type: 'restore'})
        },
    },
    effects: {
        * saveToStorage({payload}, {call, put}) {
            yield call(AsyncStorage.setItem, STORAGE_KEY, JSON.stringify(payload));
        },
        * restore({payload}, {call, put}) {
            let jsonString = yield call(AsyncStorage.getItem, STORAGE_KEY);
            if (!jsonString) {
                yield put({
                    type: 'save',
                    payload: {
                        isLogin: false,
                    }
                });
                return;
            }
            let jsonObi = JSON.parse(jsonString);
            if (!jsonObi) return;
            yield put({
                type: 'save',
                payload: {...jsonObi}
            });
        },
        *change({payload},{call,put}){
            yield put({
                type:'default',
                payload
            })
        },
        //登录
        * login({payload}, {put, call, select}) {
           try {
               let auth: AuthModel = yield select(state => state.auth);
               auth.loading = true;
               yield put({type: "save", payload: {...auth}});
               let data = payload.data||{};
               if(data.code+'' ==='200'){
                   auth.token = data.data.token;
                   auth.isLogin = true;
               }
               auth.loading = false;
               yield put({type: "save", payload: {...auth}});
               yield put({type: "saveToStorage", payload: {...auth}});
               payload.callback(auth.isLogin);
           }catch (e){
               console.log(e)
           }
        },
        //登出
        * logOut({payload}, {put, select}) {
            let auth: AuthModel = yield select(state => state.auth);
            auth.isLogin = false;
            auth.token = null;
            auth.userInfo=null;
            yield put({type: 'save', payload: {...auth}});
            yield put({type: 'saveToStorage', payload: {...auth}});
            // this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Login' })]);
            payload.callback(auth.isLogin);
        },
        //注册
        * register({payload}, {call, put}) {  },
        //找回密码
        * findPwd({payload}, {call, put}) {    },
        //验证码发送冷却时间
        * coldDown({}, {put, select}) {
            let auth = yield select(state => state.auth);
            auth.smsColdDownTime = auth.smsColdDownTime - 1;
            auth.sendSmsText = `${auth.smsColdDownTime}s 后重试`;
            yield put({type: 'save', payload: {...auth}});
        },
        //清除倒计时
        * clearColdDown({}, {put, select}) {
            let auth = yield select(state => state.auth);
            auth.smsColdDownTime = 60;
            auth.sendSmsText = '获取验证码';
            yield put({type: 'save', payload: {...auth}});
        },
        //更新用户信息
        * updateProfile({payload}, {call, select, put}) {
            let auth = yield select(state => state.auth);
            const cb = payload.cb;
            if (cb) delete payload.cb;
            yield put({type: 'save', payload: {loading: true}});
            const data = yield call(Request.put, Api.updateUserInfo, payload, {
                'Authorization': auth.token,
                'Device': "app",
                'Content-Type': 'application/json'
            },false,this);
            yield put({type: 'save', payload: {loading: false}});
            if (data && data.code === 1) {
                auth.userInfo = payload;
                yield put({type: 'save', payload: {...auth}});
                cb && cb();
            }
        },
        //获取用户信息
        * fetchPersonalInfo({payload}, {call, put, select}) {
            let auth: AuthModel = yield select(state => state.auth);
            const data = yield call(Request.get, Api.userInfo, {}, {'Authorization': auth.token, 'Device': "app"},this);
            if (data && data.code+'' === '200') {
                let formData = payload.data||{};
                if(formData.rememberUserNameStatus){
                    auth.loginInfo.userName = formData.userName;
                    auth.loginInfo.userPwd = formData.userPwd;
                    auth.loginInfo.rememberUserNameStatus = formData.rememberUserNameStatus;
                }else{
                    auth.loginInfo.userName = '';
                    auth.loginInfo.userPwd = '';
                    auth.loginInfo.rememberUserNameStatus = formData.rememberUserNameStatus;
                }
                auth.userInfo = data.data;
                yield put({
                    type: 'save',
                    payload: {...auth}
                });
                yield put({type: 'saveToStorage', payload: {...auth}});
                payload.callback();
            }
        },
        ////获取菜单树
        * getMenuTree({payload}, {call, put, select}) {
            let auth: AuthModel = yield select(state => state.auth);
            const data = yield call(Request.get, Api.getMenuTree, {}, {'Authorization': auth.token, 'Device': "app"},this);
            if (data && data.code+'' === '200') {
                let menuData = data.data||[];
                let getTree = function(tree){
                    const _this = this;
                    const k = `_parent_${this.key}`;
                    const _flatten = (data, node = {}) => {
                        return data.reduce((arr, n) => {
                            n[k] = ((n[_this.key] || n['_'+_this.key]) + ',' + node[k] || '') || '';
                            // n[k] = (( n[_this.key] ||  n[`_${_this.key}`]) + ',' + node[k] || '') || '';
                            const t = {...n};
                            delete t.children;
                            let o = {...t};
                            o[k] = n[k] || '';
                            return arr.concat([o], _flatten(n.children || [], n))
                        }, [])
                    };
                    const temp = _flatten(tree).map(i => {
                        let o = {...i,};
                        o[k] = i[k].replace(new RegExp(`undefined`, 'g'), '').split(',').filter(i => !!i).reverse().join(',');
                        return o;
                    });
                    return temp;
                };
                let menuList = getTree(menuData);
                auth.menuPromiss = menuList||[];
                yield put({
                    type: 'save',
                    payload: {...auth}
                });
                yield put({type: 'saveToStorage', payload: {...auth}});
                payload.callback();
            }
        },
    },
    reducers: {
        save(state, {payload}) {
            console.log('state',state,'payLoad',payload);
            return {...state, ...payload}
        }
    },
}

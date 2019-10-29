"use strict";
import {AsyncStorage} from "react-native";
import Request, {Api, RequestResponse} from '../utils/net/Request'
const STORAGE_KEY = "home";
export default {
    namespace: STORAGE_KEY,
    state: {
        news: [],
        tabs: [],
        loading: false,
        newsDetail: null,
        banners: [],
        applications: [],
        notices: [],
        homeBranchLifeList: [],
        degree:[],///学位
        ownComponent:[],///本人成分
        birthAddress:[]////出生地
    },
    subscriptions: {
        setup({dispatch}) {
            dispatch({type: 'restore'})
        },
    },
    reducers: {
        save(state, {payload}) {
            return {...state, ...payload}
        }
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
        // 获取首页banner
        * fetchBanner({payload}, {call, put, select}) {
            const auth: AuthModel = yield select(state => state.auth);
            let home: HomeModel = yield select(state => state.home);
            const data: RequestResponse = yield call(Request.get, Api.homeBanner, {},this);
            // console.log('homedata',data);
            if (data && data.code+'' === '200') {
                if (Array.isArray(data.data)) {
                    home.banners = data.data;
                    yield put({type: 'save', payload: {...home}})
                }

            } else {
                yield put({type: 'auth/checkError', payload: data})
            }
        },
        ////获取学位字典表
        * fetchDegree({payload}, {call, put, select}) {
            const auth: AuthModel = yield select(state => state.auth);
            let home: HomeModel = yield select(state => state.home);
            let params={
                dictType:'education'
            }
            const data: RequestResponse = yield call(Request.get, Api.dictOptionList,params,{Authorization:auth.token},this);
            if (data && data.code+'' === '200') {
                if (Array.isArray(data.data)) {
                    home.degree = data.data;
                    yield put({type: 'save', payload: {...home}})
                }

            } else {
                yield put({type: 'auth/checkError', payload: data})
            }
        },
        ////获取本人成分字典表
        * fetchOwnComponent({payload}, {call, put, select}) {
            const auth: AuthModel = yield select(state => state.auth);
            let home: HomeModel = yield select(state => state.home);
            let params={
                dictType:'post'
            };
            const data: RequestResponse = yield call(Request.get, Api.dictOptionList,params,{Authorization:auth.token},this);
            if (data && data.code+'' === '200') {
                if (Array.isArray(data.data)) {
                    home.ownComponent = data.data;
                    yield put({type: 'save', payload: {...home}})
                }

            } else {
                yield put({type: 'auth/checkError', payload: data})
            }
        },
        ////获取出生地字典表
        * fetchBirthAddress({payload}, {call, put, select}) {
            const auth: AuthModel = yield select(state => state.auth);
            let home: HomeModel = yield select(state => state.home);
            let params={
                dictType:'origin_place'
            };
            const data: RequestResponse = yield call(Request.get, Api.dictOptionList,params,{Authorization:auth.token},this);
            if (data && data.code+'' === '200') {
                if (Array.isArray(data.data)) {
                    home.birthAddress = data.data;
                    yield put({type: 'save', payload: {...home}})
                }

            } else {
                yield put({type: 'auth/checkError', payload: data})
            }
        },
        // 获取新闻详情
        * fetchNewsDetail({payload}, {call, put, select}) {
            const auth: AuthModel = yield select(state => state.auth);
            let home: HomeModel = yield select(state => state.home);
            const api = payload.api;
            if (api){
                delete payload.api;
            }
            const callback = payload.callback;
            if (callback){
                delete payload.callback;
            }
            const data: RequestResponse = yield call(Request.get, (api?api:Api.newsDetail) + `/${payload.id}`, {}, {"Authorization": auth.token},this);
            if (data && data.code+'' === '200') {
                home.newsDetail = data.data;
                yield put({ type: 'save', payload: { ...home } });
                callback&&callback();
            } else {
                yield put({type: 'auth/checkError', payload: data});

            }
        },
    }
}

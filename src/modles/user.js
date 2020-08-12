import {observable,computed,action} from 'mobx';
import { getIsLogin,setIsLogin,setToken,getToken,setUserInfo ,getUserInfo} from './cookies'
import {login} from '@src/api/login'
class UserState {
    @observable count = 0;
    @observable name = 'Jokcy';
    @observable isLogin = getIsLogin();
    @observable vm = null;
    @observable token = getToken();
    @observable userInfo =getUserInfo();
    @computed get msg(){
        return `${this.name} say  count is ${this.count}`
    }
    @action add(){
        this.count +=1
    }
    @action changeUserMenu(data){

    }
    @action changeName(name){
        this.name =name
    }
    @action login(data,e){
        login(data).then(res=>{
            if(res && res.code+''==='200'){
                let data = res.data||{};
                setToken(data.token);
                setIsLogin(true);
                setUserInfo(data.userInfo);
                e.history.replace('/');
            }else{
                return false;
            }
        })
    }
    @action loginOut(data){
        this.userInfo ={};
        this.isLogin = false;
        this.token = "";
    }
}

export default UserState

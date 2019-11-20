import {Api} from "./net/Request";
import {Moment} from "moment";
import {Dimensions, Linking} from 'react-native';
import {Modal,ActionSheet,Toast} from '@ant-design/react-native';
import ImagePicker  from 'react-native-image-picker';
import moment from 'moment';
const alert = Modal.alert;
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}

///用户身份证号
export const getInfoFromIdCard = (idCard) => {

    const n = idCard + '';
    const re = /^\d{6}(((19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])\d{3}([0-9]|x|X))|(\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])\d{3}))$/;
    let user = {
        birthday: null,
        sex: 0,
        nation: null,
        age: 0,
    };

    if (!re.test(n)) {
        return null;
    }

    //获取性别
    user.sex = parseInt(n.substr(16, 1)) % 2 === 0 ? 1 : 0;
    //获取年龄
    let myDate = new Date();
    let month = myDate.getMonth() + 1;
    let day = myDate.getDate();
    let age = myDate.getFullYear() - n.substring(6, 10) - 1;
    if (n.substring(10, 12) < month || n.substring(10, 12) === month && n.substring(12, 14) <= day) {
        age++;
    }
    user.age = age;
    let year = '';
    //判断出生日期
    if (n.length === 15) {
        year = '19' + n.substring(6, 8) + '-' + n.substring(8, 10) + '-' + n.substring(10, 12);

    }
    if (n.length === 18) {
        year = n.substring(6, 10) + '-' + n.substring(10, 12) + '-' + n.substring(12, 14);
    }
    user.birthday = year;
    // cities.forEach((v, i) => {
    //   if (n.substring(0, 6) === cities[i].code) {
    //     user.nation = cities[i].title;
    //   }
    // });
    return user;
};

///用户手机号
export const isPhone = (mobile)=>{
    let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (mobile.length === 0 || mobile === null||mobile==='') {
        return false;
    } else if (!myreg.test(mobile)) {
        return false;
    } else {
        return true;
    }
};

///用户密码
export const checkPassWord=(password)=>{
    let str = password;
    if (str === null || str.length < 6 ||str==='') {
        return false;
    }
    return true;
}

///用户邮箱
export const isEmail=(email)=>{
    if (email === '') {
       return false
    } else {
        if (!(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(email))) {
            return false
        } else {
            return true
        }
    }
}

///用户名真实姓名
export const isFullName=(fullName)=>{
    if (fullName === '') {
        return false
    } else {
        if (!/^[\u4e00-\u9fa5]+$/.test(fullName)) {
            return false;
        } else {
            if (fullName.length >= 2 && fullName.length < 7) {
                return true;
            } else {
                return false;
            }
        }
    }
}

///用户注册名
export const isUserName = (userName)=>{
    if (userName === '') {
        return false;
    } else {
        if (!/^[a-zA-Z0-9\u4e00-\u9fa5\d]+$/.test(userName)) {
            return false;
        } else {
           return true
        }
    }
}

export const zoom = (size: number) => {
    //621 * 1104
    return size * 621.0 / Dimensions.get('window').width
};

/**
 * 是否为空对象
 * @param obj
 * @return {boolean}
 */
export const isEmpty = (obj) => {
    let _obj = null;
    if (obj === null) return true;
    if (obj === undefined) return true;
    if (typeof obj === 'string') {
        _obj = obj.trim();
        return _obj.length <= 0
    }
    if (Array.isArray(obj)) {
        return obj.length <= 0
    }
    if (typeof obj === 'number') {
        return false
    }
    if (typeof obj === 'object') {
        return Object.keys(obj).length <= 0
    }
    return false

};


export const confirm = (title, msg) => {
    return new Promise((resolve, reject) => {
        alert(title, msg, [
            {text: '取消', onPress: reject},
            {text: '确定', onPress: resolve},
        ])
    });
};

/**
 * 警告modal
 * @param title
 * @param msg
 * @returns {Promise<any>}
 * @constructor
 */
export const Alert = (title, msg) => {
    return new Promise((resolve, reject) => {
        alert(title, msg, [
            {text: '确定', onPress: resolve},
        ])
    });
};


interface ActionSheetOption {
    title?: string,
    message?: string,
    options: string[],
    cancelButtonIndex?: number,
    destructiveButtonIndex?: number,
    maskClosable?: boolean
};

/**
 * 显示ActionSheet
 * @param {ActionSheetOption} options
 * @returns {Promise<any>}
 */
export const showActionSheetWithOptions = (options: ActionSheetOption) => {
    return new Promise((resolve, reject) => {
        ActionSheet.showActionSheetWithOptions(options, (buttonIndex) => {
            resolve(buttonIndex)
        })
    });
};


/**
 *
 * @param {PaginationList<any>} origin 原始数据
 * @param {PaginationList<any>} newList 新的数据
 * @param {boolean} loadMore 是否是刷新
 */
export const contactPaginationList = (origin: PaginationList<any>, newList: PaginationList<any>, loadMore = true) => {
    if (!loadMore) {
        if (!newList) return [];
        return newList
    } else {
        if (isEmpty(origin)) {
            if (isEmpty(newList)) return [];
            return newList;
        }
        let temp = {...newList};
        let newArr = [...origin.list];
        newList.list.forEach(i=>{
            newArr.push(i);
        });
        temp.list = newArr;
        return temp;
    }
};

/**
 *
 * @param origin 原始数组
 * @param size 拆分尺寸
 * @return
 */
export function chunk<T>(origin: T[], size: number): Array<T[]> {
    let chunks = origin.length / size;
    let tem = [];
    for (let i = 0; i < chunks; i++) {
        tem.push(origin.slice(i * size, (i + 1) * size));
    }
    return tem;
}


/**
 * 打开图片选择器
 * @returns {Promise}
 */
export const showImagePicker = () => {
    const options = {
        title: '选择图片',
        cancelButtonTitle: '取消',
        takePhotoButtonTitle: '拍照',
        chooseFromLibraryButtonTitle: '选择照片',
        // customButtons: [
        //     {name: 'fb', title: 'Choose Photo from Facebook'},
        // ],
        cameraType: 'back',
        mediaType: 'photo',
        videoQuality: 'high',
        durationLimit: 10,
        maxWidth: 300,
        maxHeight: 300,
        quality: 0.8,
        angle: 0,
        allowsEditing: false,
        noData: false,
        storageOptions: {
            skipBackup: true
        }
    };
    return new Promise((resolve, reject) => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                reject(new Error('User cancelled image picker'))
            }
            else if (response.error) {

                reject(new Error(`ImagePicker Error: ${response.error}`))
            }
            else {
                let source = {uri: response.uri};
                resolve(response)
            }
        });
    });

};


export const checkFileUrl = (src) => {
    if (!src) return '';
    if (typeof src === 'string') {
        if (src.toLocaleLowerCase().indexOf('http') === -1) {
            return Api.Request_url + '/' + src;
        }
    }
    return src
};

/**
 * 对象深层合并
 * @param def 源对象
 * @param obj 目标对象
 * @returns {any}
 */
export const merge = (def, obj) => {
    try {
        if (!obj) {
            return def;
        } else if (!def) {
            return obj;
        }

        for (let i in obj) {
            // if its an object
            if (obj[i] != null && obj[i].constructor == Object) {
                def[i] = merge(def[i], obj[i]);
            }
            // if its an array, simple values need to be joined.  Object values need to be remerged.
            else if (obj[i] != null && (obj[i] instanceof Array) && obj[i].length > 0) {
                // test to see if the first element is an object or not so we know the type of array we're dealing with.
                if (obj[i][0].constructor == Object) {
                    let newobjs = [];
                    // create an index of all the existing object IDs for quick access.  There is no way to know how many items will be in the arrays.
                    let objids = {}
                    for (let x = 0, l = def[i].length; x < l; x++) {
                        objids[def[i][x].id] = x;
                    }

                    // now walk through the objects in the new array
                    // if the ID exists, then merge the objects.
                    // if the ID does not exist, push to the end of the def array
                    for (let x = 0, l = obj[i].length; x < l; x++) {
                        let newobj = obj[i][x];
                        if (objids[newobj.id] !== undefined) {
                            def[i][x] = merge(def[i][x], newobj);
                        }
                        else {
                            newobjs = newobjs.concat(newobj);
                        }
                    }

                    for (let x = 0, l = newobjs.length; x < l; x++) {
                        // def[i].push(newobjs[x]);
                        def[i] = def[i].contact(newobjs[x])
                    }
                }
                else {
                    for (let x = 0; x < obj[i].length; x++) {
                        let idxObj = obj[i][x];
                        if (def[i].indexOf(idxObj) === -1) {
                            // def[i]
                            def[i] = def[i].concat(idxObj);
                        }
                    }
                }
            }
            else {
                def[i] = obj[i];
            }
        }
        return def;
    } catch (e) {
        console.log('merge->error', e);
        return def;
    }

};

/**
 * 将moment对象转换成Date对象
 * @param {moment.Moment} date
 * @returns {Date}
 */
export const transMomentToDate = (date: Moment) => {
    return new Date(date.get('y'), date.get('M'), date.get('d'), date.get('h'), date.get('m'), date.get('s'))
};


/**
 *
 * @param {any[]} array
 * @param value
 * @param {string} key
 * @returns {boolean}
 */
export const arrayContain = (array: any[], value: any, key?: string) => {
    let contain = false;
    if (!array) return contain;
    if (!Array.isArray(array)) return contain;
    if (!value) return contain;
    if (!key) {
        contain = array.indexOf(value) !== -1;
    } else {
        if (typeof value !== 'object') {
            contain = array.indexOf(value) !== -1;
        } else {
            array.forEach(v => {
                if (v.hasOwnProperty(key) && value.hasOwnProperty(key)) {
                    if (v[key] === value[key]) {
                        contain = true;
                        return contain;
                    }
                }
            });
        }
    }
    return contain;
};


/**
 * 根据支部id获取在支部树里面的支部名称
 * @param {PartyGroupItem[]} group
 * @param {string | string[]} values
 * @returns {string}
 */
export const getTreeNodeNameWithValues = (group: TreeItem[], values: string | string[]): string => {
    if (!values) return null;
    if (!group) return null;
    if (!Array.isArray(group) || Array.isArray(group) && group.length <= 0) return null;
    if (Array.isArray(values) && values.length <= 0) return null;
    let _ids = [];
    if (Array.isArray(values) && values.length > 0) _ids = values;
    if (typeof values === 'string') _ids = values.split(',');
    if (_ids.length < 0) return null;

    let groups = [];
    const _mapGroup = (i: TreeItem, arr: TreeItem[]) => {
        let j = {...i};
        delete j.children;
        arr.push(j);
        if (Array.isArray(i.children) && i.children.length > 0) {
            i.children.forEach(k => {
                _mapGroup(k, arr);
            })
        }
    };
    group.forEach(i => {
        _mapGroup(i, groups);
    });

    if (groups.length <= 0) return null;
    if (_ids.length <= 0) return null;
    let found = null;
    groups.forEach(i => {
        if (i.value === _ids[_ids.length - 1]) {
            found = i.label;
        }
    });
    return found;
};

////拨打电话
export const call = (phone) => {
    const url = `tel:${phone}`;
    Linking.canOpenURL(url)
        .then(supported => {
            if (!supported) {
                Toast.info(`您的设备不支持该功能，请手动拨打 ${phone}`, 1.5);
            }
            return Linking.openURL(url);
        }).catch(err => Toast.info(`出错了：${err}`, 1.5));
}

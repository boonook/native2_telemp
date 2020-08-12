
###  ./gradlew assembleRelease
##  adb install -r ./app/build/outputs/apk/release/app-release.apk
<p>1.支持多选，多选操作，以及字典查询操作</p>
<p>2.接收三个参数第一个参数是指哪一个输入框，第二个参数是指显示字典表选项，第三个参数是字典类型 this.refs.son.setModalVisible(1,true,'education');</p>

<h3>统计在电脑上能正常显示，再是打包之后无法正常显示</h3>
<p>1.复制tpl.html并粘贴到android->app->src->main->assets文佳佳下</p>
<p>2.const source = (Platform.OS == 'ios') ? require('./tpl.html') : {'uri':'file:///android_asset/tpl.html'}</p>
<p>3.source={source}</p>


###打包注意两部分问题
1.统计图打包之后在真机上出不来
    解决办法（1.使用src/components/plug/echars/index.js替换node_modules/native-echarts/src/components/Echarts/index）
    可参考https://blog.csdn.net/wangyingming/article/details/78750879
2.打包过程中报错Execution failed for task ':react-native-clear-app-cache:verifyReleaseResources'. > com.android.ide.common.process.ProcessException: Failed to execute aapt（sdk版本过低）
    解决办法（1.使用src/components/plug/react-cache/build.gradle替换node_modules/react-native-clear-app-cache/android/build.gradle）
    可参考https://www.cnblogs.com/boonook/p/10830984.html

###报错发现找不到ios模拟器
1.找到/Users/guokai/Desktop/ch04/node_modules/react-native/local-cli/runIOS/findMatchingSimulator.js
 找到if (!version.startsWith('iOS') && !version.startsWith('tvOS')) 需改为

1.if (!version.startsWith('com.apple.CoreSimulator.SimRuntime.iOS') && !version.startsWith('com.apple.CoreSimulator.SimRuntime.tvOS'))


### IOS 获取证书，
1.获取计算机证书 钥匙串访问-> 证书助理-> 从证书颁发机构获取证书->填写信息获取证书
2.将证书传给经理，获取证书双击获取到一个或两个（开发环境与生成环境的）证书，然后上传到极光的推送设置中去
3.配置安卓推送sdk android/app/build.gradle
``
android {
    ...
    defaultConfig {
        applicationId "yourApplicationId" // 此处改成你在极光官网上申请应用时填写的包名
        ...
        manifestPlaceholders = [
                JPUSH_APPKEY: "yourAppKey", //在此替换你极光官网上申请的 APPKey
                APP_CHANNEL: "developer-default"    //应用渠道号, 默认即可
        ]
    }
}
...
dependencies {
    compile fileTree(dir: "libs", include: ["*.jar"])
    compile project(':jpush-react-native')  // 添加 jpush 依赖
    compile project(':jcore-react-native')  // 添加 jcore 依赖
    compile "com.facebook.react:react-native:+"  // From node_modules
}
``

android/app/AndroidManifest.xml
``
<application
    ...
    <!-- Required . Enable it you can get statistics data with channel -->
    <meta-data android:name="JPUSH_CHANNEL" android:value="${APP_CHANNEL}"/>
    <meta-data android:name="JPUSH_APPKEY" android:value="${JPUSH_APPKEY}"/>

</application>``

android-->app-->src 下的 MainApplication.java


``
    // 设置为 true 将不弹出 toast
    private boolean SHUTDOWN_TOAST = false;
    // 设置为 true 将不打印 log
    private boolean SHUTDOWN_LOG = false;

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG)
            );
        }
    };

``
android-->app-->src 下的 MainActivity.java

``
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import cn.jpush.android.api.JPushInterface;

public class MainActivity extends ReactActivity {
    ...

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        JPushInterface.init(this);
    }

    @Override
    protected void onPause() {
        super.onPause();
        JPushInterface.onPause(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        JPushInterface.onResume(this);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }
}
``
4.配置ios的推送服务
（1）打开xcode 点击右侧的Capabililties  打开消息推送服务Push Notifications以及打开Background Modes下的Remote notifications
（2）修改AppDelegate.m文件中的 [JPUSHService setupWithOption:launchOptions appKey:@"a5066b289ec04cf8521ff7bf"
                                              channel:nil apsForProduction:nil];换成自己的appKey
 app中的设置并不用修改设置中的通知状态

##安卓依赖包在android studio中报错，可能导致问题出现的原因android/gradle/wrapper/gradle-wrapper.properties中的gradle版本问题，版本不能过高


##安卓打包网络请求异常，但是真机测试网络请求正常
  （1）解决方案在android->app->main->res下新建一个xml文件，在xml文件下新增一个network_security_config.xml
  （2）添加``<?xml version="1.0" encoding="utf-8"?>
        <network-security-config>
            <base-config cleartextTrafficPermitted="true" />
        </network-security-config>``
  （3）在AndroidManifest.xml文件下添加在application下添加android:networkSecurityConfig="@xml/network_security_config"即可

##react-native-webview 安卓端无法加载本地的资源文件
 （1）解决方案添加allowFileAccess={true}即可



###提交积极分子申请书点击下一步报错，但是新增成功
###积极分子分配培养人报错但是新增成功


##文件上传
    this.state.files.push({uri:'file://'+path,type:'application/octet-stream',name:name});

###文件预览组建的使用
    MainApplication.java -》import com.reactlibrary.RNReactNativeDocViewerPackage;-》getPackages（）引入new RNReactNativeDocViewerPackage()
    如果报错 Task :app:transformNativeLibsWithMergeJniLibsForDebug FAILED解决方案删除掉android/build 和 android/app/build

###Native module RNImeiModule tried to override RNImeiModule for module name IMEI.if this was your intention,set canOverrideExistingModule=

造成的原因：MainApplication.java -》getPackages（）-》引入了重复的文件

###打包之后静态资源文件丢失
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/


###安卓9的Text出现文字下面被遮挡的问题，解决方案设置lineHeight即可


###_reactNativeDeviceInfo.default.getUniqueID is not a function.(In
使用 getUniqueId 代替 getUniqueID
# native_temple


密码：
123456
###高德地图
 android:
 SHA1: 83:AB:7C:48:D9:F3:49:66:AD:9D:4D:0B:70:EE:4E:B6:68:14:E4:57
 PackageName:com.xiaomeituan
 ios
 org.reactjs.native.example.xiaomeituan

##Undefined symbols for architecture arm64或者armv7:
  查看当前的手机版本是否与你手机的一至
  Build Active Architectures Only将值设为true


###yarn 更新指定的依赖包到最新版本yarn upgrade left-pad --latest
# native2_telemp


###插件总汇
第三方路由插件

react-native-router-flux

react-native-scrollable-tab-view 选项卡

测滑动菜单

react-native-ezsidemenu

react-native-side-menu



react-native-table-component   talbe插件

基于react-navigation组件的自定义 head 视图

react-native-carousel 轮播图

react-native-countdown 倒计时

react-native-device-info 设备信息

react-native-fileupload 文件上传

react-native-icons 图标

react-native-image-picker 图片选择器

react-native-keychain iOSKeyChain管理

react-native-picker 滚轮选择器

react-native-picker-Android 安卓滚轮选择器

react-native-refreshable-listview 可刷新列表

react-native-scrollable-tab-view 可滚动标签

react-native-side-menu 侧边栏

react-native-swiper 轮播

react-native-video 视频播放

react-native-viewpager 分页浏览

react-native-scrollable-tab-view 可滑动的底部或上部导航栏框架

react-native-tab-navigator 底部或上部导航框架(不可滑动)

react-native-check-box CheckBox

react-native-splash-screen 启动白屏问题

react-native-simple-router 简易路由跳转框架

react-native-storage 持久化存储

react-native-sortable-listview 分类ListView

react-native-htmlview 将 HTML 目录作为本地视图的控件，其风格可以定制

react-native-easy-toast 一款简单易用的 Toast 组件



react-native-linear-gradient 颜色渐变处理

react-native-login  视频界面登录
react-native-keyboard-aware-scroll-view 键盘显示处理
react-native-popup-dialog 弹窗
react-native-dropdownalert 一种非常漂亮的alert弹窗方式，从状态栏往下弹窗；
react-native-simple-radio-button 单选按钮；
react-native-swiper
react-native-macos macos桌面应用
react-native-wechat 集成微信相关SDK
react-native-modalbox  模态弹窗
react-native-touch-id 指纹登录
react-native-prompt 可输入文字的弹窗
react-native-sqlite-storage sqlite数据库存储
react-native-permissions 权限检查
react-native-progress-hud loading圈
react-native-snackbar 类似toast的弹窗模式
react-native-qrcode-svg 二维码生产工具
native-base UI组件
react-native-busy-indicator loading圈
react-native-fit-image 图片展示优化
react-native-timer 定时器管理
react-native-scrollable-tab-view 可以左右滑动的tab
react-native-zip-archive 解压工具
react-native-xml2js
react-native-spinkit 好看的loading圈
react-native-interactable 有很强交互效果的table视图
react-native-pull-to-refresh 下拉刷新效果
react-native-deck-swiper 不错的swiper效果
react-native-prefix-picker select效果
react-native-gesture-helper 手势 向上还是向下 还是向左
react-native-drawer-layout 抽屉效果
react-native-sortable-listview 可拖拽排序的列表视图
react-native-progress 进度条 长方形 圆形
react-native-splash-screen 启动屏处理
react-native-masked-text 指定格式的输入框
react-native-keyboard-manager 针对IOS 键盘遮挡的问题 俺可以这么用android:windowSoftInputMode="adjustResize"
react-native-beacons-manager 蓝牙处理
react-native-fetch-blob  文件获取
react-native-popup-menu 弹出菜单
react-native-pathjs-charts 图表
react-native-dates 日历日期选择工具
react-native-calendar-strip 一种简单的日历处理
react-native-simple-markdown 简单的markdown文本编辑器
react-native-image-progress 进度条
react-native-img-cache 图片缓存技术
rn-placeholder 在展示具体的文字和图片之前有个加载样式处理
react-native-pie-chart 饼状图
react-native-maps 地图
react-native-loading-overlay loading圈加载遮罩




路由      react-navigation



底部Tab   react-native-tab-navigator



启动页  react-native-splash-screen



滑动/轮播 react-native-swiper(安卓下不能垂直滚动)    @nart/react-native-swiper(这个可以垂直滚动)



特别轮播图： react-native-snap-carousel



模态窗口：https://github.com/react-native-community/react-native-modal



显示HTML代码  react-native-render-html



图标  react-native-vector-icons(react-native link react-native-vector-icons) material-community, zocial, font-awesome, octicon, ionicon, foundation, evilicon, simple-line-icon, feather or entypo



动画  react-native-animatable



Tab选项卡 react-native-scrollable-tab-view

https://github.com/happypancake/react-native-scrollable-tab-view





签名插件：react-native-signature-capture



大图查看  react-native-image-zoom-viewer



微信（分享、支付等功能）: https://github.com/yorkie/react-native-wechat



支付宝: https://github.com/huangzuizui/rn-alipay



文件下载：react-native-fs  (react-native link后需要在android/app/build.gradle文件的dependencies加上compile project(':react-native-fs'))



数据存储： react-native-simple-store（当然选简单的咯）  react-native-storage(复杂点)



图片和base64互转  https://github.com/xfumihiro/react-native-image-to-base64



进度条：react-native-progress



自定义下拉刷新样式(ListView)：react-native-pull



Toast组件 react-native-easy-toast



毛玻璃效果(图片模糊)  react-native-blur



Input被键盘遮挡：react-native-input-scroll-view、react-native-keyboard-aware-scroll-view



下拉放大

react-native-parallax-view

react-native-parallax-scroll-view(这个貌似只有IOS有效？)





分享：react-native-share 【QQ】【QQ空间】【微信】【朋友圈】【微博】【FaceBook】 http://www.lcode.org/react-native-third-share/



底部确认卡  react-native-actionsheet



底部滚轮选择器  https://github.com/beefe/react-native-picker



侧滑出现按钮  react-native-swipeout



全屏正在加载组件  react-native-whc-loading



加载动画  react-native-spinkit



相机/相册选择图片

https://github.com/marcshilling/react-native-image-picker

https://github.com/ivpusic/react-native-image-crop-picker



图表  react-native-charts-wrapper



百度地图  react-native-baidu-map(源码报错) / https://github.com/qiuxiang/react-native-baidumap-sdk（这个在IOS下有点点BUG，可以忽略）



顶部消息  react-native-message-bar



日历组件  react-native-myCalendar 、 react-native-calendars



聊天组件  react-native-gifted-chat



抛物线组件  react-native-parabolic



视频播放  react-native-video



扫描二维码

react-native-barcode-scanner-universal  安卓/IOS

react-native-barcodescanner  安卓

react-native-camera IOS



星星评分  https://github.com/djchie/react-native-star-rating(elements框架里有了)



加密  https://www.npmjs.com/package/crypto-js



Text跑马灯效果  https://github.com/remobile/react-native-marquee-label



侧栏   react-native-side-menu



线性渐变  react-native-linear-gradient



获取设备信息  react-native-device-info



倒计时组件  react-native-CountDowntimer



照片墙  react-native-gallery



A-Z分组列表  react-native-alphabetlistview



文本超链接组件  react-native-hyperlink

侧滑出现按钮  react-native-swipeout



第二部分



选项卡 https://github.com/exponentjs/react-native-tab-navigator

material组件库

https://github.com/xinthink/react-native-material-kit

base组件库

http://nativebase.io/docs/v0.4.6/components#anatomy

https://github.com/GeekyAnts/NativeBase

按钮

https://github.com/mastermoo/react-native-action-button

https://github.com/ide/react-native-button

表单验证

https://github.com/gcanti/tcomb-form-native

https://github.com/FaridSafi/react-native-gifted-form

https://github.com/bartonhammond/snowflake

带动画效果的TextInput

https://github.com/halilb/react-native-textinput-effects

https://github.com/zbtang/React-Native-TextInputLayout

聊天

https://github.com/FaridSafi/react-native-gifted-chat

蓝牙通信

http://blog.csdn.net/withings/article/details/71378562

谷歌地图

https://github.com/lelandrichardson/react-native-maps

高德地图

https://github.com/Eleme-IMF/dodo

时间轴,快递流程图效果

https://github.com/24ark/react-native-step-indicator

https://github.com/thegamenicorus/react-native-timeline-listview

动画效果

https://github.com/oblador/react-native-animatable

加载Loading动画

https://github.com/maxs15/react-native-spinkit

抽屉效果

https://github.com/root-two/react-native-drawer

https://github.com/react-native-fellowship/react-native-side-menu

侧滑按钮

https://github.com/dancormier/react-native-swipeout

https://github.com/jemise111/react-native-swipe-list-view

图表/制图

https://github.com/tomauty/react-native-chart

股票金融

https://github.com/7kfpun/FinanceReactNative

时间组件

https://github.com/xgfe/react-native-datepicker

日历组件

https://github.com/wix/react-native-calendars

电子签名

https://github.com/jgrancher/react-native-sketch

下拉放大(回弹效果)

https://github.com/lelandrichardson/react-native-parallax-view

日历组件

https://github.com/cqm1994617/react-native-myCalendar

https://github.com/vczero/react-native-calendar

多语言

https://github.com/joshswan/react-native-globalize

单选/多选组件

https://github.com/hinet/react-native-checkboxlist

二维码

https://github.com/ideacreation/react-native-barcodescanner

制作本地库

https://github.com/frostney/react-native-create-library

影音相关

https://github.com/MisterAlex95/react-native-record-sound

提示消息(横条Bar)

https://github.com/KBLNY/react-native-message-bar

iOS原生TableView

https://github.com/aksonov/react-native-tableview

点击弹出视图

https://github.com/jeanregisser/react-native-popover

https://github.com/instea/react-native-popup-menu

3D Touch

https://github.com/madriska/react-native-quick-actions

双平台兼容的ActionSheet

https://github.com/beefe/react-native-actionsheet

照片墙

https://github.com/ldn0x7dc/react-native-gallery

键盘遮挡问题

https://github.com/reactnativecn/react-native-inputscrollview

https://github.com/wix/react-native-keyboard-aware-scrollview

本地存储

https://github.com/sunnylqm/react-native-storage

小星星评分(动画效果)

https://github.com/djchie/react-native-star-rating

扫描二维码

https://github.com/lazaronixon/react-native-qrcode-reader

通讯录

https://github.com/rt2zz/react-native-contacts

加密

https://www.npmjs.com/package/crypto-js

清除缓存

https://github.com/reactnativecn/react-native-http-cache

ListView的优化

https://github.com/sghiassy/react-native-sglistview

图片base64转码

https://github.com/xfumihiro/react-native-image-to-base64

白屏问题

https://github.com/mehcode/rn-splash-screen

Text跑马灯效果

https://github.com/remobile/react-native-marquee-label

WebView相关

https://github.com/alinz/react-native-webview-bridge

判断横竖屏

https://github.com/yamill/react-native-orientation

PDF

https://github.com/cnjon/react-native-pdf-view

获取设备信息

https://github.com/rebeccahughes/react-native-device-info

手势放大/缩小/移动

https://github.com/kiddkai/react-native-gestures

https://github.com/johanneslumpe/react-native-gesture-recognizers

上拉-刷新/下拉-加载

https://github.com/FaridSafi/react-native-gifted-listview

https://github.com/jsdf/react-native-refreshable-listview

https://github.com/greatbsky/react-native-pull/wiki

下拉选

https://github.com/alinz/react-native-dropdown

图片查看

https://github.com/oblador/react-native-lightbox

照片选择

https://github.com/marcshilling/react-native-image-picker

https://github.com/ivpusic/react-native-image-crop-picker

图片加载进度条

https://github.com/oblador/react-native-image-progress

轮播视图

https://github.com/race604/react-native-viewpager

https://github.com/FuYaoDe/react-native-app-intro

https://github.com/appintheair/react-native-looped-carousel

https://github.com/leecade/react-native-swiper

模态视图

https://github.com/maxs15/react-native-modalbox

https://github.com/brentvatne/react-native-modal

https://github.com/bodyflex/react-native-simple-modal

毛玻璃效果

https://github.com/react-native-fellowship/react-native-blur

HTML 相关

https://github.com/jsdf/react-native-htmlview

推荐一款最近用到的日历组件(iOS android 两端通用)———–2018-01-25

日历组件

https://github.com/xgfe/react-native-datepicker

下拉选组件(ios,android 两端通用)———2018-01-25

Picker组件

https://github.com/beefe/react-native-picker

短信倒计时（支持后台持续计时） ——2018-04-09

https://github.com/kkkelicheng/ReactNative-CountDownButton

# 消息推送
```bash
 yarn add react-native-tcp-socket
```


# reacct-native-mobx-boge


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

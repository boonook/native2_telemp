let Site_url = 'http://192.168.10.89:8080/serviceapp';

let Request_url = 'http://www.dahaikj.com';

let stompUrl = 'ws://192.168.60.150:7890/ws';
let WebSite = 'http://192.168.60.150:7890/zhdj_app/html';
if (global.__DEV__) {
    // Site_url = 'http://192.168.10.89:8080/serviceapp';
    Request_url = 'http://192.168.60.8:8888';
    // Request_url = 'http://192.168.60.150:7890';
    // Request_url = 'http://192.168.60.123:8888';
    // Request_url = 'http://192.168.60.142:7899';
    // Request_url = 'http://27.17.59.250:8888';
}else{
    // Request_url = 'http://27.17.59.250:8888';
    Request_url = 'http://27.17.59.250:8888';
}
const Api = {
    Request_url,
    stompUrl,
    WebSite,
    login: '/api/login/checkLogin',
    userInfo: '/api/user/info',
    ///获取获取组织机构树
    originTree:'/api/partyGroup/getGroupAllTree',
    ///获取字典列表
    dictOptionList:'/api/dict/findBySysDiction',
    /// 首页
    ///轮播图
    homeBanner: '/api/indexHome/banner/list',
    ///轮播图信息
    homeBannerDetail: '/api/indexHome/news/get',
    //党建咨询
    partyNews:'/api/webNews/list',
    // 党建资讯详情
    partyNewsDetail:'/api/indexHome/news/get',
    // 在线学习
    onlineStudyList:'/api/myLearn/list',
    /// 删除在线学习
    delOnlineStudyList:'/api/myLearn',
    // 新增在线学习
    addOnlineStudyList:'/api/myLearn/insert',
    // 修改在线学习
    editOnlineStudyList:'/api/myLearn/update',
    ///提交学习
    submitOnlineStudyList:'/api/myLearn/submit',
    ///我要汇报
    myReportList:'/api/report/myReport',
    ///新增我要汇报
    addMyReportList:'/api/report/insert',
    ///修改我要汇报
    editMyReportList:'/api/report/update',
    ///提交我要汇报
    submitMyReportList:'/api/report/submit',
    // 我要汇报详情,删除
    detailMyReportList:'/api/report',
    ///获取当前登录用户的党员信息
    getMyJoinPartyBookDetail:'/api/applyJoinParty/getByUserId',
    ///新增我要入党申请书
    addMyJoinPartyPartyBook:'/api/applyJoinParty/insert',
    ///修改我要入党申请书
    editMyJoinPartyPartyBook:'/api/applyJoinParty/update',
    ///提交我要入党申请书
    submitMyJoinPartyPartyBook: '/api/applyJoinParty/submit',
    ///获取积极分子详情信息
    activistDetail:'/api/applyActivist/getByCreateBy',
    // 新增积极分子个人信息
    addActiveSelfInfo:'/api/applyActivist/insert',
    // 修改积极分子个人信息
    editActiveSelfInfo:'/api/applyActivist/update',
    ///获取个人简历
    activeResumeList:'/api/applyActivist/getActivistResumeList',
    resumeList:'/api/applyVoluntaryBook/getMemberResumeList',
    ///新增个人简历
    addResumeList:'/api/activistResume/insert',
    ///修改个人简历
    editResumeList:'/api/activistResume/update',
    ///查看个人简历
    viewResumeDetail:'/api/applyActivist/getActivistResumeDetail',
    ///删除个人简历
    delResumeDetail:'/api/activistResume',
    ///个人奖惩情况
    activeRewardList:'/api/applyActivist/getActivistRewardList',
    activistRewardList:'/api/applyVoluntaryBook/getMemberRewardList',
    ///新增/个人奖惩情况
    addActivistRewardList:'/api/activistReward/insert',
    ///修改/个人奖惩情况
    editActivistRewardList:'/api/activistReward/update',
    ///查看/个人奖惩情况
    viewActivistRewardList:'/api/applyActivist/getActivistRewardDetail',
    ///删除个人奖惩情况
    delActivistRewardList:'/api/activistReward',
    ///家庭成员及社会关系
    activeFamilyList:'/api/applyActivist/getActivistFamilyList',
    activistFamilyList:'/api/applyVoluntaryBook/getMemberFamilyList',
    ///新增家庭成员及社会关系
    addActivistFamilyList:'/api/activistFamily/insert',
    ///修改家庭成员及社会关系
    editActivistFamilyList:'/api/activistFamily/update',
    ///查看家庭成员及社会关系
    viewActivistFamilyList:'/api/applyActivist/getActivistFamilyDetail',
    ///删除家庭成员及社会关系
    delActivistFamilyList:'/api/activistFamily',
    // 提交积极分子申请
    submitActivistFamilyList:'/api/applyActivist/submit',
    ///我要入党思想汇报
    myReportThought:'/api/reportThought/myReportThought',
    ///新增我要入党思想汇报
    addMyReportThought:'/api/reportThought/insert',
    ///修改我要入党思想汇报
    editMyReportThought:'/api/reportThought/update',
    ///查看我要入党思想汇报
    viewMyReportThought:'/api/reportThought',
    ///删除我要入党思想汇报
    delMyReportThought:'/api/reportThought',
    ///查询入党自愿申请书详情
    applyVoluntaryBook:'/api/applyVoluntaryBook/getByCreateBy',
    ///新增入党自愿申请
    addApplyVoluntaryBook:'/api/applyVoluntaryBook/insert',
    ///修改入党自愿申请
    editApplyVoluntaryBook:'/api/applyVoluntaryBook/update',
    ///参加相关活动详情
    getJoinAboutActiveDetail:'/api/applyVoluntaryBook/getMemberExplainDetail',
    ///增加参加相关活动
    addJoinAboutActive:'/api/memberExplain/insert',
    ///修改参加相关活动
    editJoinAboutActive:'/api/memberExplain/update',
    ///提交参加相关活动
    submitJoinAboutActive:'/api/applyVoluntaryBook/submit',
    ///
    submitMyReportThought:'/api/reportThought/submit',
    ///待办任务
    needDoList:'/api/act/getTaskListByUserName',
    ///提交确认积极分子意见
    confirmtaskCommit: '/api/applyActivist/taskCommit',
    ///获取确认积极分子详情
    getReportFosteredOpinion:'/api/applyActivist/getReportFosteredOpinion',
    ///第一季度培养人意见思想汇报
    applyActivistReportList: '/api/applyActivist/getReportThoughtByUserId',
    /// 指定介绍人
    getAppointFosteredList:'/api/applyActivist/getAppointFosteredList',
    ///指定培养人选择培养人列表
    selectUserList:'/api/user/choicePersonList',
    ////提交第一季度培养人意见（一）
    submitApplyVoluntaryBook:'/api/applyVoluntaryBook/taskCommit',
    ///提交第一季度培养人意见（一）详情
    detailApplyVoluntaryBook:'/api/applyVoluntaryBook/getMemberRegularDetail',
    ///获取待办任务详情
    needDoListDetail:'/api/act/getEntityByProId',
    ///提交入党申请书申请
    joinPartyTaskCommit:'/api/applyJoinParty/taskCommit',
    ///运行中
    circuitRunningList:'/api/act/getHistoricTaskByUserName',
    ///已结束的流程
    circuitOverList:'/api/act/getHistoricEndByUserName',
    ////查看转正申请详情
    formalApplyBookDetail:'/api/applyFullMember/getByUserId',
    ///入党介绍人意见
    getMemberRegularDetail:'/api/applyVoluntaryBook/getMemberRegularDetail',
    ///新增转正申请
    addFormalApplyBook:'/api/applyFullMember/insert',
    ///修改转正申请
    editFormalApplyBook:'/api/applyFullMember/update',
    ///提交转正申请
    submitFormalApplyBook:'/api/applyFullMember/submit',
    ////组织委员提交审批
    zuzhiweiyuanApply: '/api/applyFullMember/taskCommit',
    ////
    submitFullPrepareResult :'/api/applyFullMember/submit',
    ////支部大会通过党员转正决议
    getFullPrepareResultDetail:'/api/applyVoluntaryBook/getMemberRegularDetail',
    ////党员统计
    partyMemberCount:'/api/statistcal/member',
    ///党费统计
    partyFeeCount:'/api/statistcal/payRecord',
    ///投稿总数
    contributeCount:'/api/statistcal/contribute',
    ///汇报统计
    reportCount:'/api/statistcal/report',
    editSelfInfo:'/api/user/updatePersonal',
    myStudyList:'/api/myLearn/list',
    myExamList:'/api/examRecord/myList',
    ////学习
    myStudyStudy:'/api/datamanager/plan',
    ////详情
    writeReport:'/api/myLearn',
    ////提交心得体会
    submitReport:'/api/learnHeartReport/insert',
    ///查看学习心得详情
    getMyLearnDetail:'/api/learnHeartReport/getByLearnPlanIdUserId',
    ////获得试卷
    getExamPaper:'/api/examRecord/getNoAnswer',
    ///提交试卷
    submitExam:'/api/examRecord/submitExam',
    ///党建要闻
    importantNews:'/api/indexHome/news/type',
    ////修改密码
    updatePwd:'/api/user/updatePwd',
    fileUpload:'/api/file/upload',
    ////转入
    moveInto: '/api/transferIn/mine',
    addMoveInto:'/api/transferIn/insert',
    editMoveInto:'/api/transferIn/update',
    getMoveIntoDetail:'/api/transferIn',
    moveOut:'/api/transferOut/mine',
    addMoveOut:'/api/transferOut/insert',
    editMoveOut: '/api/transferOut/update',
    getMoveOutDetail:'/api/transferOut',
    moveInternal:'/api/transferInside/mine',
    submitMoveInto:'/api/transferIn/startAct',
    ////
    editMoveInternal:'/api/transferInside/update',
    addMoveInternal:'/api/transferInside/insert',
    getDetailMoveInternal:'/api/transferInside',
    submitMoveInternal:'/api/transferInside/startAct',
    moveIntoSubmitApply:'/api/transferIn/taskCommit',
    moveInternalSubmitApply:'/api/transferInside/taskCommit',
    submitMoveOut:'/api/transferOut/startAct',
    taskCommitMoveOut:'/api/transferOut/taskCommit',
    partyPayList:"/api/payRecord/mine",
    getPartyFeePaysDetail:'/api/payRecord',
    meetingList:'/api/meeting/myMeeting',
    meetingListDetail:'/api/meeting',
    myContributeList:'/api/contributeMy/myContribute',
    myContributeListDetail:'/api/contributeMy',
    newApplyTasks:'/api/webNews/taskCommit',
    viewStudyPlan:'/api/myLearn',
    transferInTaskCommitAgain:'/api/transferIn/taskCommit',
    transferInTaskCommit:'/api/transferIn/taskCommit',
    getStudyMessageDetail:'/api/myLearn',
    learnHeartReportInsert:'/api/learnHeartReport/insert',
    getWriteTipsDetail:'/api/learnHeartReport/getByLearnPlanIdUserId',
    shouldPayParty:'/api/statistcal/top',
    readDiagramToBase64:'/api/act/readDiagramToBase64',
    dictTypeList:'/api/indexHome/dict',
    register:'/api/login/register',
    ///查看会议参与人员
    meetingJoinMens:'/api/meeting/user',
    meetingImportant:'/api/meetingSummary/meeting',
    getExamPaperNoAnswer:'/api/examRecord',
    addMemberFamily:'/api/memberFamily/insert',
    editMemberFamily:'/api/memberFamily/update',
    delMemberFamily:'/api/memberFamily',
    viewMemberFamily:'/api/applyVoluntaryBook/getMemberFamilyDetail',
    addMemberResume:'/api/memberResume/insert',
    editMemberResume:'/api/memberResume/update',
    delMemberResume:'/api/memberResume',
    viewMemberResume:'/api/applyVoluntaryBook/getMemberResumeDetail',
    joinPartyView:'/api/applyJoinParty/list',
    joinPartyViewDetail:'/api/applyJoinParty',
    joinPartyViewMens:'/api/applyJoinParty/getAppointFosteredList',
    update:"/api/report/update",
    preview:"/api/onlineRead/preview",
    getDatamanagerDetail:"/api/datamanager",
    getWorkList:"/api/workProgress/workabled",
    getWorkListDetail:"/api/workProgress/read",
    submitWorkList:"/api/workProgress/submit",
    getWorkProgressDetail:"/api/workProgress/getWorkProcessId",
    adjust:"/api/workProgress/adjust",
    submitWorkDeploy:"/api/workProgress/taskCommit",
    submitAdjust:"/api/workProgress/submitAdjust",
    getWorkDevelopList:"/api/workProgress/workDevelop",
    getWorkUserCountList:"/api/workDeploy/getDeployStatistical",
    getWorkUserList: "/api/workDeploy/getWorkUserList",
    meetingCount:"/api/statistcal/meeting",
    transferInDetail:"/api/transferIn/getByUserId",
    getMenuTree:'/api/menu/tree'
};
export default Api;

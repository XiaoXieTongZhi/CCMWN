import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import * as axios from "@/api/index";
const store = createStore({
  plugins: [
    createPersistedState({
      //默认存储所有的state
      reducer: (state) => {
        if (localStorage.getItem("token")) {
          return {
            userid: state.userid,
            personMessage: state.personMessage,
            like: state.like,
            username: state.username,
            userlevel: state.userlevel,
            userschool: state.userschool,
            school: state.school,
          };
        }
      },
    }),
  ],
  state() {
    return {
      //切换moon和light模式
      mode: 1,
      //滚动条框
      maincolor: "linear-gradient(to bottom, red 0%, orange 50%, #eee8aa 100%)",
      //滚动条
      color: "rgba(221, 59, 19, 0.949)",
      //当前所属留言墙
      school: "主留言墙",
      //模态框的状态
      isModal: false,
      //newcard名称 发布时的名称  待处理 这个东西需要改改 尽量少用
      name: localStorage.getItem("name"),
      //登录用户的id
      userid: 0,
      //登陆用户的姓名
      username: " ",
      //登陆用户的权限
      userlevel: " ",
      //用户自己的所属留言墙  待废弃
      userschool: "",
      //喜爱反馈
      like: false,
      //举报反馈
      report: false,
      //选择的postid
      postid: 0,
      //选择的用户id
      selectuserid: 0,
      //所有的postid
      allpostid: [],
      //用户搜索得结果
      inputselectvalue: [],
      //个人信息的显示与隐藏
      isperson: false,
      //用户信息变量
      personMessage: {
        name: "",
        fensi: [],
        guanzhu: [],
        isguanzhu: false,
        posts: [],
        //顶部栏的个人头像
        userhead: "默认.png",
        //查看个人信息显示的头像
        watchuserhead: "默认.png",
        bgcpicture: "默认.png",
        personsignature: "",
        usercount: 0,
        likecount: 0,
        fanscount: 0,
        systemcount: 0,
      },
      feedbackisshow: false,
      //end
      form: "users",
      formmessage: [],
      rowmessages: {},
    };
  },
  actions: {
    changeForm(ctx, value) {
      ctx.commit('setform', value|| 'users')
      axios
        .getforms({
          formname: value || 'users',
        })
        .then((res) => {
          if (res.data.code == 200) {
            ctx.commit('setFormmessage', res.data.data)
          }
        })
    },
  },
  mutations: {
    setform(state,data){
      state.form=data
    },
    setrowmessage(state,data){
     state.rowmessages=data
    },
    setFormmessage(state, data) {
      state.formmessage = data
    },
    changeuserlevel(state, data) {
      state.userlevel = data;
    },
    changelikecount(state, data) {
      state.personMessage.likecount = data;
    },
    changefanscount(state, data) {
      state.personMessage.fanscount = data;
    },
    changeusercount(state, data) {
      state.personMessage.usercount = data;
    },
    changesystemcount(state, data) {
      state.personMessage.systemcount = data;
    },
    changeusername(state, data) {
      state.username = data;
    },
    //滚动条设置
    changeColor(state, data) {
      //设置滚动条
      state.maincolor = data.maincolor;
      //设置滚动框
      state.color = data.color;
    },
    changeSchool(state, data) {
      state.school = data;
    },
    changeuserschool(state, data) {
      state.userschool = data;
    },
    //这里是修改模态框状态
    changeModal(state) {
      state.isModal = !state.isModal;
    },
    updatename(state, data) {
      state.name = data;
    },
    updateuserid(state, data) {
      state.userid = data;
    },
    changeLike(state, data) {
      state.like = data;
    },
    changereport(state, data) {
      state.report = data;
    },
    updatepostid(state, data) {
      state.postid = data;
    },
    allpostid(state, data) {
      state.allpostid = data;
    },
    inputselectvalue(state, data) {
      state.inputselectvalue = data;
    },
    changeisperson(state, data) {
      state.isperson = data;
    },
    changepersonname(state, data) {
      state.personMessage.name = data;
    },
    changepersonfensi(state, data) {
      state.personMessage.fensi = data;
    },
    addpersonfensi(state, data) {
      state.personMessage.fensi.push(data);
    },
    deletepersonfensi(state, data) {
      let index = state.personMessage.fensi.indexOf(data);
      state.personMessage.fensi.splice(index, 1);
    },
    changepersonguanzhu(state, data) {
      state.personMessage.guanzhu = data;
    },
    changeisguanzhu(state, data) {
      state.personMessage.isguanzhu = data;
    },
    changeselectuserid(state, data) {
      state.selectuserid = data;
    },
    changeposts(state, data) {
      state.personMessage.posts = data;
    },
    changeuserhead(state, data) {
      state.personMessage.userhead = data;
    },
    changewatchuserhead(state, data) {
      state.personMessage.watchuserhead = data;
    },
    changebgcpicture(state, data) {
      state.personMessage.bgcpicture = data;
    },
    changename(state, data) {
      state.personMessage.name = data;
    },
    changepersonsignature(state, data) {
      state.personMessage.personsignature = data;
    },
    changefeedbackisshow(state, data) {
      state.feedbackisshow = data;
    },
  },
});
export default store;

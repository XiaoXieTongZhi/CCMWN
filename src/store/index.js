import { createStore } from "vuex";


const store = createStore({
    state () {
      return {
        //切换moon和light模式
        mode:1,
        //滚动条框
       maincolor:'linear-gradient(to bottom, red 0%, orange 50%, #eee8aa 100%)',
      //滚动条
      color:'rgba(221, 59, 19, 0.949)',
     school:'主留言墙',
     isModal:false,
      isbutton:false,
      }
    },
    mutations: {
      //滚动条设置
      changeColor(state,data){
      //设置滚动条
        state.maincolor = data.maincolor
        //设置滚动框
        state.color = data.color
      },
      changeSchool(state,data){
        state.school = data
        console.log(state.school);
      },
      //这里是修改两个状态 让按钮跟模态框同步
      changeModal(state){
        state.isModal =!state.isModal
        state.isbutton =!state.isbutton
      },
      //这里直修改模态框
      changeModaltwo(state){
        state.isModal =!state.isModal
       
      }
    }
  })

  export default store
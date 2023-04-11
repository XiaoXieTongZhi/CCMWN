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
      }
    },
    mutations: {
      //滚动条设置
      changeColor(state,data){
      
        state.maincolor = data.maincolor
        state.color = data.color
       
      }
    }
  })

  export default store
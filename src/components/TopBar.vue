<template>
  <div class="top-bar" ref="topBar">
    <div class="logo">
      <img src="@/assets/logo.png" class="logo-img" alt="" />
      <p class="logo-name">CCMWN</p>
    </div>
    <div class="menu">
      <router-link to="/wall">
        <pr-button
          :size="'max'"
          :nom="$route.path == '/wall' ? 'primary' : 'secondary'"
          class="menu-message"
        >
          {{
            $store.state.school == "主留言墙" ? "主留言墙" : "校园留言墙"
          }}</pr-button
        >
      </router-link>
      <router-link to="/personwall">
        <pr-button
          :size="'max'"
          :nom="$route.path == '/personwall' ? 'primary' : 'secondary'"
          class="menu-mine"
          >个人空间</pr-button
        >
      </router-link>
    </div>

    <div class="user">
      <div class="user-head"></div>
      <span class="name">{{ dusername }}</span>
      <div class="user-login">
        <van-button type="small" :color="'#989898'" @click="changelogin()">{{
          login
        }}</van-button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.van-button--small {
  min-width: 30px;
}
.top-bar {
  width: 100%;
  height: 4.05rem;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3px);
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.875rem;
  box-sizing: border-box;

  .logo {
    width: 6.25rem;
    display: flex;
    align-items: center;

    .logo-img {
      width: 1.5rem;
      height: 1.5rem;
    }

    .logo-name {
      font-size: 1.05rem;
      color: $gray-1;
      font-weight: 3.75rem;
      padding-left: 0.625rem;
    }
  }

  .user {
    width: 10.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .name{
      min-width: 70px;
    }
    .user-head {
      border-radius: 50%;
      height: 1.5rem;
      width: 1.5rem;
      background-image: linear-gradient(180deg, #7be7ff, #1e85e2);
    
    }
  }

  .menu {
    display: flex;
    align-items: center;

    .menu-message {
      margin-right: 1.5rem;
    }
  }
}
</style>

<script>
import PrButton from "@/components/PrButton.vue";

import { inject, ref } from "vue";

export default {
  props:{
      username:{
        Type:String,
        default:''
      }
  },
  setup() {
    const bus = inject("bus");
    let topBar = ref(null);
    let login = ref("登录");
    let istoken =ref(" ");
    let dusername = ref("登陆发言");
    bus.getTopBarHeight = () => {
      return +topBar.value.clientHeight;
    };

    return { topBar, login,istoken,dusername };
  },
  components: {
    PrButton,
  },
  computed:{
        isbutton(){
          
          return this.$store.state.isModal
        },
        usernamecomputed(){

        }
  },
  watch:{
    username(){
      this.dusername =this.username
    },
    isbutton(){
      this.istoken=localStorage.getItem('token');
   
      if (this.istoken) {
       this.login='退出'; 
      }else{
        this.login='登录'; 
      }
    }
  },
  mounted(){
      //判断是否有本地local来决定按钮显示内容
      this.istoken=localStorage.getItem('token');
      if (this.istoken) {
       this.login='退出'; 
      }else{
        this.login='登录'; 
      }
    },
  methods: {

    changelogin() {
      if (this.login=='登录') {
        this.$store.commit("changeModal");
      }else{
        this.dusername ='登陆发言'
        localStorage.removeItem('token')
        this.login='登录'; 
      }
       
  
    
    },
  },
 
};
</script>

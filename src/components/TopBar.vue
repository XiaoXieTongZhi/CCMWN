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
      <router-link to="/tool">
        <pr-button
          :size="'max'"
          :nom="$route.path == '/tool' ? 'primary' : 'secondary'"
          class="menu-mine"
          >工具</pr-button
        >
      </router-link>
    </div>
    <div class="search">
      <search-modal></search-modal>
    </div>
    <div class="user">
      <div
        class="user-head"
        :style="{
          'background-image': `url(${baseImgPath}/uploads/userimg/${address})`,
        }"
        @click="userheadclick(dusername)"
      ></div>
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
    width: 5.25rem;
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
    width: 9.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .name {
      min-width: 20px;
    }
    .user-head {
      cursor: pointer;
      border-radius: 50%;
      width: 2.75rem;
      height: 2.75rem;
      background-size: cover;
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
import { baseImgPath } from "@/utils/env";
import * as axios from "@/api/index";
import PrButton from "@/components/PrButton.vue";
import SearchModal from "@/components/search/search.vue";
import { inject, ref } from "vue";
import { showToast } from "vant";
export default {
  props: {
    username: {
      Type: String,
      default: "",
    },
  },
  setup() {
    const bus = inject("bus");
    let topBar = ref(null);
    let login = ref("登录");
    let istoken = ref(" ");
    let dusername = ref("登陆发言");
    bus.getTopBarHeight = () => {
      return +topBar.value.clientHeight;
    };
    return { topBar, login, istoken, dusername };
  },
  data(){
    return{
      baseImgPath
    }
  },
  components: {
    SearchModal,
    PrButton,
  },
  computed: {
    address() {
      return this.$store.state.personMessage.userhead;
    },
    isbutton() {
      return this.$store.state.isModal;
    },
  },
  watch: {
    username: {
    handler(newValue) {
      localStorage.setItem("name", newValue);
      this.$store.commit("updatename", newValue);
    }
  },
    isbutton() {
      this.istoken = localStorage.getItem("token");
      if (this.istoken) {
        this.login = "退出";
      } else {
        this.login = "登录";
      }
    },
  },
  mounted() {
    if (this.$store.state.username!==' ') {
     this.dusername= this.$store.state.username;
    }
    //判断是否有本地local来决定按钮显示内容
    this.istoken = localStorage.getItem("token");
    if (this.istoken) {
      this.login = "退出";
    } else {
      this.login = "登录";
    }
  },
  methods: {
    userheadclick(value) {
      if (
        value !== "登录发言" &&
        localStorage.getItem("name") &&
        localStorage.getItem("token")
      ) {
        this.$store.commit("changeselectuserid", this.$store.state.userid);
        this.$store.commit("changeisperson", true);
        this.$store.commit("changepersonname", this.$store.state.username);
        axios
          .selectFollow({
            params: {
              username: this.$store.state.username,
            },
          })
          .then((res) => {
            this.$store.commit("changepersonfensi", res.data.fensiId);
            this.$store.commit("changepersonguanzhu", res.data.guanzhuId);
            if (
              res.data.fensiId
                .map((res) => res.follower_id)
                .includes(JSON.parse(localStorage.getItem("vuex")).userid)
            ) {
              this.$store.commit("changeisguanzhu", true);
            } else {
              this.$store.commit("changeisguanzhu", false);
            }
            axios.selectuserall({params:{
              userid:res.data.userid
            }}).then(res =>{
              this.$store.commit('changewatchuserhead',res.data.avatar)
              this.$store.commit("changebgcpicture", res.data.background);
            }).catch(err =>{
              console.log(err);
            })
          })
          .catch((err) => {
            if (this.$store.state.isModal) {
              this.$store.commit("changeModal");
              showToast({
                message: "登陆状态已过期，请重新登录",
                style: {
                  backgroundColor: "transparent",
                  fontWeight: "600",
                },
              });
            }
          });
      } else {
        showToast({
          message: "请先登录才能查看信息哦",
          style: {
            backgroundColor: "transparent",
            fontWeight: "600",
          },
        });
      }
    },
    changelogin() {
      if (this.login == "登录") {
        this.$store.commit("changeModal");
      } else {
        this.dusername = "登陆发言";
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("vuex");
        this.login = "登录";
      }
    },
  },
};
</script>

<template>
  <div class="options">
    <span
      class="iconfont icon-form works"
      :class="{ active: selectedIcon === 'works' }"
      @click="selectIcon('works'),changeoption(1)"
      title="用户发布的帖子"

      >{{  postcount }}</span
    >
    <span
      v-show="$store.state.userid == $store.state.selectuserid"
      class="iconfont icon-comments setting"
      :class="{ active: selectedIcon === 'setting' }"
      @click="selectIcon('setting'),changeoption(2)"
      title="消息"
      ></span
    >
    <span
      v-show="$store.state.userid == $store.state.selectuserid"
      class="iconfont icon-set message"
      :class="{ active: selectedIcon === 'message' }"
      @click="selectIcon('message'),changeoption(3)"
      title="设置"
    ></span>
    <span
      class="iconfont icon-assessedbadge authen"
      :class="{ active: selectedIcon === 'authen' }"
      @click="selectIcon('authen'),changeoption(4)"
      title="认证"
    ></span>
  </div>
</template>

<style lang="scss" scoped>
.options {
  width: 100%;
  height: 10%;
  border: 1px solid black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .works {
    cursor: pointer;
    font-size: 1.1rem;
  }
  .message {
    cursor: pointer;
    font-size: 1.1rem;
  }
  .setting {
    cursor: pointer;
    font-size: 1.1rem;
  }
  .authen {
    cursor: pointer;
    font-size: 1.1rem;
  }
  .works:hover,
  .message:hover,
  .setting:hover,
  .authen:hover,
  .active {
    color: red;
  }
}
</style>

<script>
import * as axios from "@/api/index";
export default {
  data() {
    return {
      selectedIcon: "works", // 将selectedIcon设置为第一个图标的值
    };
  },
  computed:{
  postcount(){
  return this.$store.state.personMessage.posts.length
  }  ,
  selectuseridchange(){
    return this.$store.state.selectuserid
  }
},
watch:{
  //监听变化  跟随更新  不知道为什么  点击头像更新 触发不了这个监听器 所以下面只能再用个mounted了
  selectuseridchange: {
    immediate: true,
    handler() {
      axios
        .usercardCount({
          params: {
            userid: this.$store.state.selectuserid,
          },
        })
        .then((res) => {
          this.$store.commit("changeposts", res.data.data);
        })
        .catch((err) => {});
    }
  }
},
 
   
  
  methods: {
    changeoption(value){
      this.$emit('changeoption',value)
    },
    selectIcon(icon) {
      this.selectedIcon = icon;
    },
  },
};
</script>

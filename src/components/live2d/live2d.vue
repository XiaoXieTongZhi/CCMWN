<template>
  <!-- 使用示例 -->
  <div >
    <live2d
   
      :style="style"
      :model="['Potion-Maker/Pio', 'school-2017-costume-yellow']"
      :direction="direction"
      :size="size"
      :homePage="'https://lamian.blog.csdn.net/'"
      :tips="tips"
      :setmsg="setmsg"
    ></live2d>
  </div>
</template>

<script>
import live2d from "vue-live2d";

export default {
  name: "App",
  components: {
    live2d,
  },
  data() {
    return {
      direction: "left",
      style: "",
      width: 500,
      height: 500,
      size: 350,
      tips: null,
      setmsg:['1','2','3'],
      customTips:{
        copy: [
          {
            selector: "document",
            texts: ["你都复制了些什么呀，转载要记得加上出处哦！"],
          },
        ],
        visibilitychange: [
          {
            selector: "document",
            texts: ['欢迎你回来'],
          },
        ],
        scroll:[
        {
          
            selector: "document",
            texts: ['欢迎来到CCMWN'],
          },
        ],
        mouseover: [
          {
            selector: ".vue-live2d-tool .custom-fa-comment",
            texts: ["猜猜我要说些什么？", "欣赏一些有意思的短句？"],
          },
          {
            selector: ".vue-live2d-tool .custom-fa-user-circle",
            texts: ["想看看我的朋友们吗？"],
          },
          {
            selector: ".vue-live2d-tool .custom-fa-street-view",
            texts: ["变装！"],
          },
          {
            selector: ".vue-live2d-tool .custom-fa-camera-retro",
            texts: ["一起拍照留念？"],
          },
          {
            selector: ".vue-live2d-tool .custom-fa-info-circle",
            texts: ["(＾Ｕ＾)ノ~ＹＯ"],
          },
          {
            selector: ".vue-live2d-tool .custom-fa-times",
            texts: ["就要说再见了吗？"],
          },
        ],
      },
    };
  },
  created() {
    // tips 未使用，可自行在组件绑定此参数，注意此参数只会初始化一次
    this.tips = this.customTips;
  },
};
</script>

<style lang="scss" scoped>

</style>

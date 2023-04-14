<template>
  <div class="new-card">
    <div class="color-card">
      <p
        class="color-li"
        v-for="(e, index) in cardcolortwo"
        :key="index"
        :style="{ backgroundColor: e }"
        :class="{ colorselected: index == selected }"
        @click="changeColor(index)"
      ></p>
    </div>
    <div class="card-main" :style="{ backgroundColor: cardcolor[selected] }">
      <textarea
        placeholder="输入留言内容"
        class="message"
        maxlength="500"
      ></textarea>
      <input type="text" placeholder="个人名称" class="name" disabled />
    </div>
    <div class="labels">
      <p class="title"></p>
    </div>

    <van-uploader
      :after-read="afterRead"
      v-model="fileList"
      multiple
      :max-count="4"
      preview-size="4rem"
      :preview-options="{'closeable':true}"
    >
      <van-button size="small" icon="add-o" type="primary" >上传图片</van-button>
    </van-uploader>
  </div>
</template>

<script>
import { cardcolor, cardcolortwo } from "@/utils/data";
export default {
  data() {
    return {
      cardcolor,
      cardcolortwo,
      selected: 0, //当前选择的颜色
      //文件上传的图片数组
      fileList: [],
    };
  },
  methods: {
    changeColor(index) {
      this.selected = index;
    },
    //文件上传vant方法
    afterRead(file) {
      file.status = "uploading";
      file.message = "上传中...";
      setTimeout(() => {
        file.status = "success";
        file.message = null;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.new-card {
  padding: 0 $padding-20;

  .color-card {
    padding-bottom: $padding-12;
    display: flex;
    align-items: center;

    .color-li {
      width: 1.3rem;
      height: 1.3rem;
      margin-right: $padding-8;
    }

    .colorselected {
      border: 1px solid rgba(59, 115, 240, 1);
    }
  }

  .card-main {
    height: 15rem;
    width: 100%;
    padding: 0.75rem;
    box-sizing: border-box;

    .message {
      background: none;
      border: none;
      resize: none;
      height: 11.75rem;
      width: 100%;
      font-size: 0.875rem;
      padding: $padding-8;
      box-sizing: border-box;
    }

    .name {
      width: 100%;
      box-sizing: border-box;
      padding: $padding-8;
      background: none;
      border: none;
      height: 1.55rem;
      line-height: 1.55rem;

      @font-face {
        font-family: fa;
        src: url("@/assets/阿里妈妈数黑体/Alimama_ShuHeiTi_Bold.ttf");
      }

      font-family: fa;
      font-size: 0.75rem;
    }
  }
}
</style>

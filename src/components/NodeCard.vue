<template>
  <div class="node-card" :style="{ backgroundColor: cardcolor[note.imgurl] }">
    <div class="top">
      <p class="time">{{ filter(Date.parse(note.moment)) }}</p>
      <p class="pictureshow"  @click=" clickbg" >查看图片</p>
      <p class="label">{{ label[note.label] }}</p>
    </div>
    <div class="message" :style="bgpicture ? {'background-image': 'url(../assets/images/测试图片.png)'} : ''">

      <van-text-ellipsis
        :content="note.message"
        expand-text="展开"
        collapse-text="收起"
        rows="5"
      />

     
    </div>
    <div class="foot">
      <div class="foot-left">
        <span v-red-on-hover-click class="iconfont icon-favorites">{{
          note.comment
        }}</span>
        <span v-red-on-hover class="iconfont icon-comments">{{
          note.like
        }}</span>
      </div>
      <div class="name">{{ note.name }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@font-face {
  font-family: fa;
  src: url("@/assets/阿里妈妈数黑体/Alimama_ShuHeiTi_Bold.ttf");
}

.node-card {
  font-family: fa;
  opacity: 0.68;
  min-height: 186px;
  min-width: 164px;
  height: 12rem;
  width: 13rem;
  background-color: rgba(252, 175, 162, 0.3);
  box-sizing: border-box;
  position: relative;
  margin-top: 1.925rem;
  margin-left: 2rem;

  .top {
    display: flex;
    justify-content: space-between;
    padding: 0 0.625rem;
    font-weight: 600;
    margin-bottom: 10px;
    p {
      font-size: 0.75rem;
      color: $gray-2;
    }
    .pictureshow{
      cursor: pointer;
    }
  }
  .message {
    
    height: 6.75rem;

    color: $gray-1;
    letter-spacing: 0;
    line-height: 1.375rem;
    text-align: justify;
    padding: 0 0.75rem;
    display: -webkit-box;
    
    
    overflow: auto;
    cursor: pointer;
    font-size: 0.625rem;
  }
  .foot {
    display: flex;
    justify-content: space-around;
    position: absolute;
    bottom: 0.125rem;

    left: 0;
    width: 100%;
    .name {
      cursor: pointer;
      font-weight: 600;
      font-size: 0.675rem;
      margin-right: -0.625rem;
    }
    .foot-left {
      width: 5.75rem;
      display: flex;

      align-items: center;
      span {
        margin-right: 1.25rem;
        cursor: pointer;
        font-size: 0.75rem;

        line-height: 1rem;
      }
      .iconfont {
        font-size: 0.7rem;
      }
    }
  }
}
</style>

<script>
import { label, cardcolor } from "@/utils/data";

import moment from "moment";

export default {
  directives: {
    "red-on-hover-click": {
      mounted(el) {
        el.style.transition = "color 0.8s";
        let clicked = false;
        el.addEventListener("click", function () {
          if (!clicked) {
            this.style.color = "red";
            clicked = true;
          } else {
            this.style.color = "";
            clicked = false;
          }
        });
        el.addEventListener("mouseenter", function () {
          if (!clicked) {
            this.style.color = "red";
          }
        });
        el.addEventListener("mouseleave", function () {
          if (!clicked) {
            this.style.color = "";
          }
        });
      },
    },
    "red-on-hover": {
      mounted(el) {
        el.style.transition = "color 0.8s";
        el.addEventListener("mouseenter", function () {
          this.style.color = "red";
        });
        el.addEventListener("mouseleave", function () {
          this.style.color = "";
        });
      },
    },
  },
  data() {
    return {
      label,
      cardcolor,
      //判断背景图片是否显示
      bgpicture:false,
    };
  },
  props: {
    note: {
      Type: [Object, String],
      default: {},
    },
  },
  methods: {
    filter(data) {
      return moment(data).format("YYYY-MM-DD");
    },
    clickbg(){
    this.bgpicture = true
  }
  },
  
};
</script>

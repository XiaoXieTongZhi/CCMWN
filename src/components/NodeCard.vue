<template>
  <div class="node-card" :style="{ backgroundColor: note.color }">
    <div class="top">
      <p class="time">{{ filter(Date.parse(note.post_date)) }}</p>
      <p class="pictureshow" @click="clickbg">
        {{ !bgpicture ? "查看图片" : "查看文字" }}
      </p>
      <p class="label" >{{ note.type }}</p>
    </div>
    <div class="message"
      :style="bgpicture ? { 'background-image': `url(http://localhost:3000/uploads/img/${note.image_url})` } : ''">
      <van-text-ellipsis @click.native.stop :content="!bgpicture ? note.content : ''" expand-text="展开" collapse-text="收起"
        rows="5" />
    </div>
    <div class="foot">
      <div class="foot-left">
        <span ref="postid" v-show="false">{{ note.postid }}</span>
        <span v-red-on-hover-click class="iconfont icon-favorites">{{
          note.like_count
        }}</span>
        <span v-red-on-hover class="iconfont icon-comments" @click="selectwall">{{
          note.comment_count
        }}</span>
      </div>
      <div class="name">{{ note.username }}</div>
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

  min-height: 11.625rem;
  min-width: 10.25rem;
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
    margin-bottom: 0.625rem;

    p {
      font-size: 0.75rem;
      color: $gray-2;
    }

    .pictureshow {
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
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    overflow: auto;

    font-size: 0.725rem;
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
        font-size: 1.1rem;
        line-height: 1rem;
      }

      .iconfont {
        font-size: 0.75rem;
      }
    }
  }
}
</style>

<script>


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
     
      text: this.note.message,
      //判断背景图片是否显示
      bgpicture: false,
    };
  },
  props: {
    note: {
      type: [Object, String],
      default: {},
    },
  },

  methods: {
  
   
    filter(data) {
      return moment(data).format("YYYY-MM-DD");
    },
    clickbg() {
      this.bgpicture = !this.bgpicture;
    },
    selectwall() {
      this.$emit('selectpostid', this.$refs.postid.textContent);
      this.$emit('selected')
    }
  },
};
</script>

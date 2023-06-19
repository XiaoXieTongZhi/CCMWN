<template>
  <div class="top-info">
    <div class="left">
      <div class="logo-user">
        <div
          class="logo"
          :style="{
            'background-image': `url(http://localhost:3000/uploads/userimg/${address})`,
          }"
        ></div>
        <div class="name">{{ name }}</div>
      </div>
      <div class="follow">
        <div class="follower">粉丝数:{{ fensi }}</div>
        <div class="followed">关注数:{{ guanzhu }}</div>
      </div>
    </div>
    <div class="right">
      <button
        :class="isguanzhu ? 'buttonF' : 'buttonT'"
        @click="changeisguanzhu(isguanzhu ? '已关注' : '关注')"
      >
        {{ isguanzhu ? "已关注" : "关注" }}
      </button>
    </div>
  </div>
</template>

<script>
import * as axios from "@/api/index";
import { showToast } from "vant";
export default {
  data() {
    return {};
  },
  computed: {
    address() {
      return this.$store.state.personMessage.watchuserhead;
    },
    name() {
      return this.$store.state.personMessage.name;
    },
    fensi() {
      return this.$store.state.personMessage.fensi.length;
    },
    guanzhu() {
      return this.$store.state.personMessage.guanzhu.length;
    },
    isguanzhu() {
      return this.$store.state.personMessage.isguanzhu;
    },
  },
  methods: {
    changeisguanzhu(value) {
      if (value == "关注") {
        if (this.$store.state.selectuserid == this.$store.state.userid) {
          showToast({
            message: "自己关注自己不太好吧(-_-)",

            style: {
              backgroundColor: "transparent",
              fontWeight: "600",
            },
          });
        } else {
          axios
            .guanzhuT({
              followerid: this.$store.state.userid,
              followedid: this.$store.state.selectuserid,
            })
            .then((res) => {
              if (res.data.code == 200) {
                showToast({
                  message: "关注成功",

                  style: {
                    backgroundColor: "transparent",
                    fontWeight: "600",
                  },
                });
                this.$store.commit("changeisguanzhu", true);
                this.$store.commit("addpersonfensi", this.$store.state.userid);
              }
            })
            .catch((err) => {});
        }
      } else if (value == "已关注") {
        axios
          .guanzhuF({
            followerid: this.$store.state.userid,
            followedid: this.$store.state.selectuserid,
          })
          .then((res) => {
            if (res.data.code == 200) {
              showToast({
                message: "取消关注",

                style: {
                  backgroundColor: "transparent",
                  fontWeight: "600",
                },
              });
              this.$store.commit("changeisguanzhu", false);

              this.$store.commit("deletepersonfensi", this.$store.state.userid);
            }
          })
          .catch((err) => {});
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.top-info {
  display: flex;
  width: 100%;
  height: 20%;
  .left {
    width: 70%;
    height: 100%;
    font-size: 0.86rem;
    .logo-user {
      display: flex;
      width: 100%;
      height: 45%;
      justify-content: space-around;
      align-items: center;
      .logo {
        border-radius: 50%;
        width: 2.75rem;
        height: 2.75rem;
        background-size: cover;
      }
      .name {
        font-weight: 600;
      }
    }
    .follow {
      height: 55%;
      display: flex;
      font-weight: 600;
      justify-content: space-around;
      align-items: center;
      .follower,
      .followed {
        cursor: pointer;
      }
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .buttonT {
      cursor: pointer;
      background-color: #b3e6ff; /* 淡蓝色背景 */
      border: 2px solid white; /* 白色边框 */
      color: white; /* 白色文字 */
      /* 内边距 */
      text-align: center; /* 文字居中 */
      text-decoration: none; /* 无下划线 */
      display: inline-block; /* 行内块元素 */
      font-size: 1rem; /* 文字大小 */
      border-radius: 8px; /* 圆角 */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影 */
    }

    .buttonT:hover {
      background-color: #ffd9d9; /* 淡粉色背景 */
    }
    .buttonF {
      cursor: pointer;
      background-color: #ffd9d9; /* 淡粉色背景 */
      border: 2px solid white; /* 白色边框 */
      color: white; /* 白色文字 */
      /* 内边距 */
      text-align: center; /* 文字居中 */
      text-decoration: none; /* 无下划线 */
      display: inline-block; /* 行内块元素 */
      font-size: 1rem; /* 文字大小 */
      border-radius: 8px; /* 圆角 */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影 */
    }

    .buttonF:hover {
      background-color: #b3e6ff; /* 淡蓝色背景 */
    }
  }
}
</style>

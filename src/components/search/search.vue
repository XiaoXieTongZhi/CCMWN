<template>
  <div class="container">
    <div class="a">
      <input
        type="text"
        class="b"
        v-model="searchvalue"
        placeholder="卡片id或用户姓名"
      />
      <div class="c">
        <img
          src="../search/搜索框.png"
          style="width: 20px; height: 20px"
          @click="selectcard"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
body {
  background-color: #e94118;
  overflow: hidden;
}
.a {
  margin-top: 70px;
  margin-right: -8.125rem;
  transform: translate(-50%, -50%);
  background-color: tr;
  height: 40px;
  border-radius: 40px;
  padding: 10px;
}
.a:hover .b {
  width: 5rem;
  padding: 0 6px;
}
.a:hover .c {
  background-color: wheat;
}
.b {
  margin-right: 0.525rem;
  border: none;
  background: none;
  /* 取消选中搜索框时的外边框 */
  outline: none;
  width: 0;
  padding: 0;
  transition: 0.4s;
  line-height: 40px;
  font-size: 0.625rem;
  color: black;
  font-weight: 600;
}
.c {
  cursor: pointer;
  color: #e94118;
  float: right;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #2f3640;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
}
</style>
<script>
import * as axios from "@/api/index";
export default {
  data() {
    return {
      searchvalue: "",
    };
  },
  methods: {
    selectcard() {
      if (/^\d+$/.test(this.searchvalue)) {
        axios
          .selectCard({
            params: {
               branch:this.$store.state.school,
              value: this.searchvalue,
              type: "postid",
            },
          })
          .then((res) => {
            if (res.data.message.length !== 0) {
              this.$store.commit('inputselectvalue',res.data.message)
            }else{
              this.$store.commit('inputselectvalue',[{content:'没有搜索到任何内容捏,注意搜索框只能搜索帖子的id和用户姓名,你只能搜索到主留言墙，和你认证的留言墙的帖子',image_url:'默认.png'}])
            }
          })
          .catch((err) => {});
      } else {
        axios
          .selectCard({
            params: {
               branch:this.$store.state.school,
              value: this.searchvalue,
              type: "username",
            },
          })
          .then((res) => {
              if (res.data.message.length !== 0) {
                this.$store.commit('inputselectvalue',res.data.message)
            }else{
              this.$store.commit('inputselectvalue',[{content:'没有搜索到任何内容捏,注意搜索框只能搜索帖子的id和用户姓名你只能搜索到主留言墙,和你认证的留言墙的帖子',image_url:'默认.png'}])
            }
          })
          .catch((err) => {});
      }
    },
  },
};
</script>

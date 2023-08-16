<template>
  <div class="body">
    <el-tabs v-model="activeTab" type="border-card" class="demo-tabs">
      <el-tab-pane
        :label="key"
        v-for="(value, key, index) in rowmessages"
        :name="key"
        :key="key"
      >
        <textarea
          :value="value"
          @input="inputvalueevent"
          class="text"
          :style="{ 'background-image': bgcstyle }"
        >
        </textarea>
      </el-tab-pane>
      <el-tab-pane
        :label="'发送消息'"
        v-if="
          form == 'users' || form == 'comments' || form == 'posts'
            ? true
            : false
        "
        :name="'发送消息'"
      >
        <el-input
          type="textarea"
          :rows="10"
          :placeholder="'发送给userid为' + rowmessages.userid + '的用户'"
          v-model="textarea"
        >
        </el-input>
        <el-button type="warning" @click="sendsystemmessage(rowmessages.userid)"
          >发送系统消息</el-button
        >
      </el-tab-pane>
    </el-tabs>
    <div>
      <el-button
        type="primary"
        @click="changevalue"
        v-if="activeTab !== '发送消息'"
        >修改</el-button
      >
      <el-button type="danger" @click="deleterow">删除</el-button>
    </div>
  </div>
</template>

<script>
import { baseImgPath } from "@/utils/env";
import * as axios from "@/api/index";
import { mapState, mapActions } from "vuex";
import { showToast } from "vant";
export default {
  data() {
    return {
      //字段名
      activeTab: "",
      //输入修改的值
      inputvalue: "",
      textarea: "",
    };
  },

  computed: {
    ...mapState(["rowmessages", "form"]),
    conditionkey() {
      return Object.keys(this.rowmessages)[0];
    },
    conditionvalue() {
      return this.rowmessages[this.conditionkey];
    },
    bgcstyle() {
      if (this.form == "users" && this.activeTab == "avatar") {
        return `url(${baseImgPath}/uploads/userimg/${
          this.rowmessages[this.activeTab]
        })`;
      } else if (this.form == "users" && this.activeTab == "background") {
        return `url(${baseImgPath}/uploads/bgcimg/${
          this.rowmessages[this.activeTab]
        })`;
      } else if (this.form == "posts" && this.activeTab == "image_name") {
        return `url(${baseImgPath}/uploads/img/${
          this.rowmessages[this.activeTab]
        })`;
      }
    },
  },
  watch: {
    activeTab() {
      this.inputvalue = "";
    },
  },
  methods: {
    sendsystemmessage(value) {
      axios
        .sendsystemmessage({
          userid: value,
          message: this.textarea,
        })
        .then((res) => {
          if (res.data.code == 200) {
            showToast({
              message: res.data.message,

              style: {
                backgroundColor: "transparent",
                fontWeight: "600",
                position: "fixed",
                top: "50%",
                left: "50%",
              },
            });
            this.textarea = "";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ...mapActions(["changeForm"]),
    inputvalueevent(event) {
      this.inputvalue = event.target.value;
    },
    deleterow() {
      if (JSON.stringify(this.rowmessages) !== "{}") {
        axios
          .deleterowmessage({
            formname: this.form,
            conditionkey: this.conditionkey,
            conditionvalue: this.conditionvalue,
          })
          .then((res) => {
            if (res.data.code == 200) {
              this.changeForm(this.form);
              showToast({
                message: res.data.message,

                style: {
                  backgroundColor: "transparent",
                  fontWeight: "600",
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                },
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    changevalue() {
      if (this.inputvalue !== "") {
        if (this.form == "users") {
          if (this.activeTab == "avatar_username" && this.inputvalue == 1) {
            axios
              .sendsystemmessage({
                userid: this.rowmessages.userid,
                message: "姓名修改审核成功",
              })
              .then((res) => {
                this.$store.commit("changeusername", this.rowmessages.username);
                this.$store.commit("changename", this.rowmessages.username);
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (
            this.activeTab == "avatar_reviewed" &&
            this.inputvalue == 1
          ) {
            axios
              .sendsystemmessage({
                userid: this.rowmessages.userid,
                message: "头像修改审核成功",
              })
              .then((res) => {
                console.log(res.data);
                this.$store.commit("changeuserhead", this.rowmessages.avatar);
                this.$store.commit(
                  "changewatchuserhead",
                  this.rowmessages.avatar
                );
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (
            this.activeTab == "background_reviewed" &&
            this.inputvalue == 1
          ) {
            axios
              .sendsystemmessage({
                userid: this.rowmessages.userid,
                message: "背景修改审核成功",
              })
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (this.activeTab == "bio_reviewed" && this.inputvalue == 1) {
            axios
              .sendsystemmessage({
                userid: this.rowmessages.userid,
                message: "个性签名修改审核成功",
              })
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        } else if (this.form == "posts") {
          if (this.activeTab == "is_approved" && this.inputvalue == 1) {
            axios
              .sendsystemmessage({
                userid: this.rowmessages.userid,
                message: "卡片发布审核成功",
              })
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        } else if (this.form == "comments") {
          if (this.activeTab == "is_approved" && this.inputvalue == 1) {
            axios
              .sendsystemmessage({
                userid: this.rowmessages.userid,
                message: "评论发布审核成功",
              })
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }

        axios
          .changeformvalue({
            formname: this.form,
            activeTab: this.activeTab,
            activeTabvalue: this.inputvalue,
            conditionkey: this.conditionkey,
            conditionvalue: this.conditionvalue,
          })
          .then((res) => {
            if (res.data.code == 200) {
              this.changeForm(this.form);
              showToast({
                message: res.data.message,

                style: {
                  backgroundColor: "transparent",
                  fontWeight: "600",
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                },
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        showToast({
          message: "没改变内容，就别修改了",

          style: {
            backgroundColor: "transparent",
            fontWeight: "600",
            position: "fixed",
            top: "50%",
            left: "50%",
          },
        });
      }
    },
  },
};
</script>
<style scoped lang="scss">
button.el-button.el-button--warning {
  width: 100%;
}
.body {
  display: flex;
  width: 1000px;
  > div {
    display: flex;
    flex-direction: column;
  }
  .text {
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
  > div {
    width: 70vw;
  }
}
textarea {
  width: 100%;
  height: 20vh;
  font-size: xx-large;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
</style>

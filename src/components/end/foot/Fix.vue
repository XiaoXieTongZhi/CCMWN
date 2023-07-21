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
        <el-button type="warning" @click="sendsystemmessage(rowmessages.userid)">发送系统消息</el-button>
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
      condition: {},
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
        return `url(http://localhost:3000/uploads/userimg/${
          this.rowmessages[this.activeTab]
        })`;
      } else if (this.form == "users" && this.activeTab == "background") {
        return `url(http://localhost:3000/uploads/bgcimg/${
          this.rowmessages[this.activeTab]
        })`;
      } else if (this.form == "posts" && this.activeTab == "image_name") {
        return `url(http://localhost:3000/uploads/img/${
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
    sendsystemmessage(value){
   
      axios.sendsystemmessage({
        userid:value,
        message:this.textarea
      }).then(res =>{
        
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
        this.textarea=''
        }
      }).catch(err =>{

      })
    },
    ...mapActions(["changeForm"]),
    inputvalueevent(event) {
      this.inputvalue = event.target.value;
    },
    deleterow() {
      if (JSON.stringify(this.rowmessages) !== "{}") {
        if (this.form == "users") {
          this.condition = {};
          this.condition.userid = this.rowmessages.userid;
          console.log(this.condition);
        } else if (this.form == "posts") {
          this.condition = {};
          this.condition.postid = this.rowmessages.postid;
        } else if (this.form == "follows") {
          this.condition = {};
          this.condition.id = this.rowmessages.id;
        } else if (this.form == "feedbacks") {
          this.condition = {};
          this.condition.feedbacksid = this.rowmessages.feedbacksid;
        } else if (this.form == "comments") {
          this.condition = {};
          this.condition.commentid = this.rowmessages.commentid;
        } else if (this.form == "system_messages") {
          this.condition = {};
          this.condition.message_id = this.rowmessages.message_id;
        }
        axios
          .deleterowmessage({
           
            formname: this.form,
            conditionkey: Object.keys(this.condition)[0],
            conditionvalue: this.condition[Object.keys(this.condition)[0]],
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
          .catch((err) => {});
      }
    },
    changevalue() {
      if (this.inputvalue !== "") {
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
          .catch((err) => {});
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

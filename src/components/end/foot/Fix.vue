<template>
  <div class="body">
    <el-tabs v-model="activeTab" type="border-card" class="demo-tabs">
      <el-tab-pane
        :label="key"
        v-for="(value, key, index) in rowmessages"
        :name="key"
        :key="key"
      >
        <textarea :value="value" @input="inputvalueevent"></textarea>
      </el-tab-pane>
    </el-tabs>
    <el-button type="primary" @click="changevalue">修改</el-button>
    <el-button type="danger">删除</el-button>
  </div>
</template>

<script>
import * as axios from "@/api/index";
import { mapState } from "vuex";
import { showToast } from "vant";
export default {
  data() {
    return {
      //字段名
      activeTab: "",
      //输入修改的值
      inputvalue: "",
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
  },
  watch: {
    activeTab() {
      this.inputvalue = "";
    },
  },
  methods: {
    inputvalueevent(event) {
      this.inputvalue = event.target.value;
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
          .then((res) => {})
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
.body {
  width: 100px;
}
textarea {
  width: 100%;
  height: 30vh;
}
.demo-tabs > .el-tabs__content {
  display: flex;
  flex-wrap: wrap;
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

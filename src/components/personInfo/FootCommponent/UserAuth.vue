<template>
  <div class="body">
    <div class="personal-signature">
      <span>个性签名</span>
      <div class="styled-text">
        {{ store.state.personMessage.personsignature }}
      </div>
    </div>
    <div class="campus-certification">校园认证
      <div class="cschool">
        <span><img src="../../../assets//logo.png" alt="" v-show="cschool!==null"></span>
       &emsp; {{ cschool }}
      </div>
    </div>
    <div class="c-authentication">
      C认证
      <div class="cauth">
        <span><img src="../../../assets//logo.png" alt="" v-show="cauth!==null"></span>
       &emsp; {{ cauth }}
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.body {
  height: 100%;
 .cauth,.cschool{
 padding-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
img{
  width: 20px;
  height: 20px;
}
 }
  .personal-signature,
  .campus-certification,
  .c-authentication {
    height: 35%;
    border-bottom: 1px solid black;
    text-align: center;
    font-weight: 600;
  }
  .styled-text {
    padding: 20px;
    font-weight: normal;
    text-decoration: underline;
    font-family: Arial, sans-serif;
    white-space: pre-wrap;
    overflow-wrap: break-word;
  }
}
</style>
<script setup>
import * as axios from "@/api/index";
import { useStore } from "vuex";
import { ref, reactive, watch, onMounted } from "vue";
import { showToast } from "vant";
let store = useStore();
const data = reactive({});
let cauth = ref("");
let cschool = ref("");
onMounted(() => {
  axios
    .selectuserall({ params: { userid: store.state.userid } })
    .then((res) => {
      cschool = res.data.campus_auth;
      cauth = res.data.c_auth;
      store.commit("changepersonsignature", res.data.bio);
    })
    .catch((err) => {});
    axios
    .selectuserall({ params: { userid: store.state.selectuserid } })
    .then((res) => {
      cschool = res.data.campus_auth;
      cauth = res.data.c_auth;
    })
    .catch((err) => {});
});
</script>

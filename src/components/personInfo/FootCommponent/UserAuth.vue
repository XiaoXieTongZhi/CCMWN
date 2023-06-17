<template>
  <div class="body">
    <div class="personal-signature">
      <span>个性签名</span>
      <div class="styled-text">
        {{ store.state.personMessage.personsignature }}
      </div>
    </div>
    <div class="campus-certification">校园认证</div>
    <div class="c-authentication">C认证</div>
  </div>
</template>
<style lang="scss" scoped>
.body {
  height: 100%;

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

onMounted(() => {
  axios
    .selectuserall({ params: { userid: store.state.userid } })
    .then((res) => {
      store.commit("changepersonsignature", res.data.bio);
    })
    .catch((err) => {});
});
</script>

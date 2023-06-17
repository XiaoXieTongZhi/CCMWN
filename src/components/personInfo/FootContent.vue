<template>
  <div class="foot-content">
    <user-postid v-show="type == 1"></user-postid>
    <user-message v-show="type == 2"></user-message>

    <user-setting v-show="type == 3"></user-setting>
    <user-auth v-show="type == 4"></user-auth>
  </div>
</template>

<style lang="scss" scoped>
.foot-content {
  width: 100%;
  height: 70%;
 
}
</style>
<script>
import UserSetting from "./FootCommponent/UserSetting.vue";
import UserAuth from "./FootCommponent/UserAuth.vue";
import UserMessage from "./FootCommponent/UserMessage.vue";
import UserPostid from "./FootCommponent/UserPostid.vue";
export default {
  data() {
    return {};
  },
  props: {
    type: {
      default: 1,
      Type: Number,
    },
  },

  components: {
    UserPostid,
    UserAuth,
    UserMessage,
    UserSetting,
  },
};
</script>

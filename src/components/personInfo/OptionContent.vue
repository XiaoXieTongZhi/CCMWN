<template>
  <div class="options">
    <span class="iconfont icon-form works" title="用户发布的帖子">12</span>
    <span class="iconfont icon-comments setting" title="消息">2</span>
    <span class="iconfont icon-set message" title="设置"></span>
    <span class="iconfont icon-assessedbadge authen" title="认证"></span>
  </div>
</template>

<style lang="scss" scoped>
.options {
  width: 100%;
  height: 10%;
  border: 1px solid black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .works {
    cursor: pointer;
    font-size: 1.1rem;
  }
  .message {
    cursor: pointer;
    font-size: 1.1rem;
  }
  .setting {
    cursor: pointer;
    font-size: 1.1rem;
  }
  .authen{
    cursor: pointer;
    font-size: 1.1rem;
  }
  .works:hover,
  .message:hover,
  .setting:hover,
  .authen:hover {
    color: red;
  }
}
</style>

<script></script>

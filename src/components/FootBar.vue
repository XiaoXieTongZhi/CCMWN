<template>
  <div class="foot-bar">
    <div class="foot-left">
      <div class="logo">
        <div class="logo-img">
          <img src="@/assets/logo.png" alt="" />
        </div>
        <p class="logo-name">中国校园留言墙网络</p>
      </div>
      <div class="content">
        <p class="introduce">************* **********</p>

        <p class="state">
          <span>声明</span>
          <span>备案/*****</span>
        </p>
      </div>
    </div>
    <div class="foot-right">
      <div class="content">
        <img class="zimage" src="@/assets/images/赞赏码.png" alt="微信打赏" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.foot-bar {
  color: $gray-3;
  min-height: 109px;
  min-width: 690px;
  width: 100%;
  height: 7.5rem;
  background-color: black;

  position: absolute;
  bottom: 0.5;
  left: 0;
  display: flex;
  justify-content: space-between;
  .foot-right {
    .content {
      .zimage {
        margin: 0.625rem;
        width: 6.25rem;
        height: 6.25rem;
      }
    }
  }
  .foot-left {
    margin-left: 1.875rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
    .logo {
      
      height: 3.125rem;
      line-height: 3.125rem;
      display: flex;
      min-width: 137px;
      width: 8.8rem;
      justify-content: space-between;
      overflow: hidden;
      .logo-img {
        img {
          margin-top: 1.45rem;
          width: 1.5rem;
          height: 1.5rem;
        }
      }
    }
  }
}
</style>

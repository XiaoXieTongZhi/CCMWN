<template>
  <div class="top-info">
    <div class="left">
      <div class="logo-user">
        <div
          class="logo"
          :style="{
            'background-image': `url(http://localhost:3000/uploads/img/默认.png)`,
          }"
        ></div>
        <div class="name">姓名</div>
      </div>
      <div class="follow">
        <div class="follower">粉丝数:232</div>
        <div class="followed">关注数:212</div>
      </div>
    </div>
    <div class="right">
      <button class="button">关注</button>
      <button class="button">私信</button>
    </div>
  </div>
</template>

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
        background-color: red;
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
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .button {
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

    .button:hover {
      background-color: #ffd9d9; /* 淡粉色背景 */
    }
  }
}
</style>

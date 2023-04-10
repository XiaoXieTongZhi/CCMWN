<template >
    <div class="box" @click="change()">
      <div :class="containerClass" id="container">
        <div class="bg"></div>
        <div class="moon-box">
          <div class="moon"></div>
        </div>
        <div class="sun-box">
          <div class="sun"></div>
        </div>
        <div class="sea"></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        containerClass: 'light' // changed from 'dark' to 'light'
      }
    },
    methods: {
      change() {
        this.containerClass = this.containerClass === 'dark' ? 'light' : 'dark';
        if (this.$store.state.mode==1) {
            this.$store.state.mode=-1
        } else{
            this.$store.state.mode=1
        }
      }
    }
  }
  </script>


<style  lang="scss"  scoped>

body{
    /* 初始化 取消内外边距 */
    margin: 0;
    padding: 0;
}
#container{
    /* 100%窗口高度 */
    height: 100vh;
}
.bg{
    /* 绝对定位 */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent; /* Remove background color */
}
.sun{
    margin: 0;
    padding: 0;
    /* 绝对定位 水平垂直居中 */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 18.75rem;
    height: 18.75rem;
    background-color: orange;
    border-radius: 50%;
}
.moon{
    margin: 0;
    padding: 0;
    /* 绝对定位 水平垂直居中 */
    position: absolute;
    top: 50%;
    left: 50%;
    /* 计算得出月亮的位置 */
    transform: translate(calc(-50% + -80px),calc(-50% + -90px));
    width: 18.75rem;
    height: 18.75rem;
    /* 通过阴影绘制月亮 */
    box-shadow: 5rem 5.625rem 0 cyan;
    border-radius: 50%;
}
.sea{
    position: absolute;
    left: 0;
    bottom: -4.6875rem;
    width: 100%;
    height: 40%;
    /* 背景模糊制造大海的感觉 */
    backdrop-filter: blur(100px);
    -webkit-backdrop-filter: blur(100px);
    z-index: 2;
}
.sun,
.moon,
.sun-box,
.moon-box,
.bg{
    /* 添加动画过渡 */
    transition: all 1s ease-in-out;
}
.sun-box,
.moon-box{
    /* 相对定位 */
    position: relative;
    /* 溢出隐藏 */
    overflow: hidden;
}
/* 白天 */
.light .sun-box{
    height: 100%;
}
.light .moon-box{
    height: 0;
}
.light .bg{
    background-color: transparent;
}
/* 夜晚 */
.dark .sun-box{
    height: 0;
}
.dark .moon-box{
    height: 100%;
}
.dark .bg{
    background-color: transparent; /* Remove background color */
}
/* 切换按钮样式 */
.btn-box{
    display: none;
}
</style>








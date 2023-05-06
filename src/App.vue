<template>
  <router-view></router-view>
</template>

<script>
import { provide, reactive } from "vue";
import debounce from "@/utils/debounce";

function setRootFontSize() {
  let scale = document.documentElement.clientWidth / 750;
  document.documentElement.style.fontSize = scale * 16 + "px";
  if (scale > 1.5) {
    document.documentElement.style.fontSize = scale * 11 + "px";
  }
}

setRootFontSize();

window.onresize = () => {
  debounce(setRootFontSize)();
};
export default {
  name: "App",
  setup() {
    const bus = reactive({
      getTopBarHeight: null, // 获取头部导航栏方法
      modalHeight: 0, // 侧边栏最终高
      modalHeadHeight: 0, // 侧边栏 head 的高
      modalMainHeight: 0, // 侧边栏 main 的高
    });

    provide("bus", bus);
  },
  computed: {
    maincolor() {
      return this.$store.state.maincolor;
    },
  },
  components: {},
  watch: {
    maincolor() {
      document.documentElement.style.setProperty(
        "--main-color",
        this.maincolor
      );
      document.documentElement.style.setProperty("--color", this.color);
    },
  },
};
</script>

<style lang="scss">
:root {
  --main-color: linear-gradient(to bottom, red 0%, orange 50%, #eee8aa 100%);
  --color: rgba(221, 59, 19, 0.949);
}

::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 100%;
  background: var(
    --main-color
  ); //background: linear-gradient(to bottom, #00008B 0%, skyblue  50%, lightblue 100%);
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: var(--color);
  //background-color: rgb(20, 87, 213);
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}

#app {
  font-size: 0.7125rem;
}
</style>

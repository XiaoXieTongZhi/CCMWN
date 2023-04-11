<template>
  <router-view></router-view>
</template>

<script>


export default {
  name: 'App',
//   data(){
// return{
//   color:this.$store.state.color
// }
//   },
  computed:{
    maincolor(){
    return  this.$store.state.maincolor
   }
  },
  components: {
  
  },
 watch:{
  maincolor(){
    
    document.documentElement.style.setProperty("--main-color", this.maincolor);
    document.documentElement.style.setProperty("--color", this.color);
  }
 }

}
</script>

<style lang="scss">
:root {
    --main-color:linear-gradient(to bottom, red 0%, orange 50%, #eee8aa 100%);
    --color: rgba(221, 59, 19, 0.949);
  }
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width : 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 100%;
  background: var(--main-color)
  //background: linear-gradient(to bottom, #00008B 0%, skyblue  50%, lightblue 100%);
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius : 10px;
  background-color:var(--color);
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
 
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  font-size: 0.7125rem;

}
</style>

<template>
    <div>
        <el-container>
      <el-header class="top"><top-title></top-title></el-header>
      <el-container>
        <el-aside class="aside"><aside-message></aside-message></el-aside>
        <el-container>
          <el-main class="main"><main-message></main-message></el-main>
          <el-footer class="footer"><foot-message></foot-message></el-footer>
        </el-container>
      </el-container>
    </el-container>
    </div>
</template>
<script>
import TopTitle from '../components/end/TopTitle'
import AsideMessage from '../components/end/AsideMessage'
import MainMessage from '../components/end/MainMessage'
import FootMessage from '../components/end/FootMessage'
export default{
    data(){
        return{
        }
    },
    components:{
        TopTitle,
        AsideMessage,
        MainMessage,
        FootMessage
    }
}
</script>
<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
  .top{
    margin-bottom: 50px;
  }
  .aside{
    overflow: scroll;
  }
  .main{
    height: 55vh;
  }
  .footer{
    height: 45vh;
  }
}
</style>
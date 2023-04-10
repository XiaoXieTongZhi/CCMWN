<template>
    <div :class="$store.state.mode === 1 ?'sun':'moon'">
        <top-bar></top-bar>

        <router-view></router-view>
        <foot-bar></foot-bar>
    </div>
</template>

<script>
import TopBar from "../components/TopBar";
import FootBar from "@/components/FootBar.vue";
export default{
    data(){
        return{

        }
    },
    mounted(){
        document.documentElement.scrollTop=700.79998
    },
    components:{
        TopBar,
        FootBar
    },
    computed:{

    },
    created(){

    },
    methods:{
        getUser(){
             
        }
    }
}
</script>

<style lang="scss" scoped>
  .sun{
    background-color: #ffeea2;
  }
  .moon{
    background-color: #949494;
  }
</style>
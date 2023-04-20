<template>

    <div :class="$store.state.mode === 1 ?'sun':'moon'">
        <back-ground></back-ground>
        <top-bar></top-bar>
       
        <router-view></router-view>
        
        <foot-bar></foot-bar>
    </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import FootBar from "@/components/FootBar.vue";
import  BackGround from '@/components/BackGround.vue';
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
        FootBar,
        BackGround
    },
    computed:{

    },
    created(){

    },
    methods:{
        getUser(){
             
        }
    },
}
</script>

<style lang="scss" scoped>
  .sun{
    background: radial-gradient(circle at center top, red 0%, orange 50%, #eee8aa 100%);}
  .moon{
    background: radial-gradient(circle at center top, #00008B 0%, skyblue  50%, lightblue 100%);
 }
</style>
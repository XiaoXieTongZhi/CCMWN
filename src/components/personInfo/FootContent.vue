<template>
    <div class="foot-content">
       <user-postid></user-postid>
    </div>
</template>

<style lang="scss" scoped>
 .foot-content{
            width: 100%;
            height: 70%;
            border: 1px solid black;
        }
     
</style>
<script>
import UserPostid from './FootCommponent/UserPostid.vue';
export default {
    data(){
        return{

        }
    },


components:{
    UserPostid
}

}



</script>
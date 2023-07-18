<template>
    <div class='body'>
        <ul >
            <li><span @click="data='1'" :style="data === '1' ? { color: 'red' } : {}">评论消息{{ $store.state.personMessage.usercount!==0 ?$store.state.personMessage.usercount:' ' }}</span></li>
            <li><span @click="data='2'" :style="data === '2' ? { color: 'red' } : {}">系统消息{{ $store.state.personMessage.systemcount!==0 ?$store.state.personMessage.systemcount:' ' }}</span></li>
           
            <li><span @click="data='3'" :style="data === '3' ? { color: 'red' } : {}">卡片反馈{{ $store.state.personMessage.likecount!==0 ?$store.state.personMessage.likecount:' ' }}</span></li>
            <li><span @click="data='4'" :style="data === '4' ? { color: 'red' } : {}">关注消息{{ $store.state.personMessage.fanscount!==0 ?$store.state.personMessage.fanscount:' ' }}</span></li>
        </ul>
        <user-message v-show="data == 1" ref="likeMessage"> </user-message>
        <system-message v-show="data == 2"></system-message>
        <like-message v-show="data == 3"></like-message>
       
        
        <fans-follow v-show="data == 4"></fans-follow>
    </div>
</template>


<script >
import FansFollow from "./UserMessage/FansFollow.vue";
import LikeMessage from "./UserMessage/LikeMessage.vue";
import UserMessage from "./UserMessage/UserMessage.vue";
import SystemMessage from "./UserMessage/SystemMessage.vue";
export default {
    data(){
    return{
        data:'1',
        
    }
 },
    components:{
        FansFollow,
        LikeMessage,
        UserMessage,
        SystemMessage
    },
   
  
    methods:{

    }

}




</script>


<style lang="scss" scoped>
.body{
    overflow: hidden;
 
    ul{
        padding: 10px 0px;
        display: flex;
        justify-content: space-around;
        border-bottom: 1px solid black;
        li{
            
            background-color: rgb(218, 219, 116);
            padding: 5px;
            cursor: pointer;
            :hover{
                color: red;
            }
        }
    }
}

</style>
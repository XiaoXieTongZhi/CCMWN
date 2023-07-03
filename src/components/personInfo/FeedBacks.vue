<template>
    <div class="body">
        <ul v-show="props.followdata == 'follower'">
            <li v-for="(data,index) in store.state.personMessage.fensi" :key="index">
                <span class="head"   :style="{
          'background-image': `url(http://localhost:3000/uploads/userimg/${data.avatar})`,
        }"></span>
                <span class="name">{{data.username}} &emsp; <span>ID:{{ data.follower_id
 }}</span></span>
            </li>
        </ul>
        <ul v-show="props.followdata == 'followed'">
            <li v-for="(data,index) in store.state.personMessage.guanzhu" :key="index">
                <span class="head"   :style="{
          'background-image': `url(http://localhost:3000/uploads/userimg/${data.avatar})`,
        }"></span>
                <span class="name">{{data.username}} &emsp; <span>ID:{{ data.followed_id
 }}</span></span>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useStore } from "vuex";
let store = useStore();
const props = defineProps(['followdata'])

</script>
<style lang="scss" scoped>
.body{
    box-sizing: border-box;
    
}
ul{
    list-style: none;
   li{
    padding: 20px 0px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid black;
    
    .head{
        display: block;
        border-radius: 50%;
      
       background-size: cover;
        height: 50px;
        width: 50px;
    }
    .name{
 font-size: 20px;
 font-weight: bold;
    }
   }
   
}

</style>
<template>
  <div class="card-detail">
    <div class="top-bt">
      <!-- <p class="revoke">联系墙主撕掉该便签</p> -->
      <p class="report">举报</p>
    </div>
    <node-card :note="card" class="nodecard"></node-card>
    <div class="form">
      <textarea class="message" placeholder="请输入评论"></textarea>
      <div class="bt">
        <select class="name" >
  <option value="用户名称" class="option">用户名称</option>
  <option value="匿名" class="option">匿名</option>
</select>
        <pr-button :size="'small'">确定</pr-button>
      </div>
    </div>
    <p class="title">
        评论
        {{ card.comment_count }}
    </p>
       <div class="commont">
        <div class="commont-li" v-for="(data,index) in commont" :key="index">
            <div class="user-head" :style="{backgroundImage:portrait[1]}"></div>
            <div class="comm-m">
                <div class="m-top">
                    <p class="name">{{ data.username }}</p>
                    <p class="time">{{filter(Date.parse(data.comment_date)) }}</p>
                </div>
                <div class="content">
                {{ data.content }}
                </div>
            </div>
        </div>
       </div>
   
  </div>
</template>

<style lang="scss" scoped>
.card-detail {
    overflow: hidden;
  .nodecard {
    margin-left: 1.3625rem;
  }
  .top-bt {
    height: 0px;
    padding: $padding-20;
    align-items: center;
    justify-content: space-between;
    display: flex;
    // .revoke {
    //   color: $primary-color;
    //   cursor: pointer;
    //   padding-right: 1.875rem;
    //   font-size: $size-14;
    // }
    .report {
      font-size: $size-14;
      cursor: pointer;
      color: $warning-color;
    }
  }
  .form {
    margin: 0 auto;
  
    width: 80%;
    .message {
      background: none;
     height: 7.125rem;
      resize: none;
      padding: $padding-8;
      box-sizing: border-box;
      width: 100%;
      margin-top: .75rem;
    }
    .bt{
        display: flex;
        justify-content: space-between;
    .name {
      width: 50%;
      box-sizing: border-box;
      padding: $padding-8;
      border: 1px solid rgba(148, 148, 148, 1);
      line-height: 1.25rem;
      background: none;
    

    }
}
  }
  .title{
    margin-left: .925rem;
    font-weight: 600;
    padding: 1rem 0;
  }

  .commont-li{
    margin-left: .9375rem;
    display: flex;
    padding-bottom: 1rem;
    .user-head{
        flex: none;
     border-radius: 50%;
     overflow: hidden;
        width: 1.75rem;
        height: 1.75rem;
    }
    .comm-m{
        padding: 0 $padding-8;
    }
    .m-top{
        display: flex;
        .name{
            font-weight: 600;
        }
        .time{
            font-size: $size-12;
            padding-left: $padding-4;
            color: $gray-3;
        }
    }
    .content{
        padding-top: $padding-4;
    }
  }
}
</style>

<script>
import * as axios from "@/api/index";
import NodeCard from "./NodeCard.vue";
import PrButton from "./PrButton.vue";
// import {commont} from '../../mock/index';
import {portrait} from '@/utils/data';
import NodeCardmethods from '@/components/NodeCard.vue'
export default {
  data() {
    return {
        commont:'',
        portrait,
       
    };
  },
  
  props: {
    card: {
      type: [String, Object],
      default: {},
    },
    postid:{
      type:String,
      default:''
    }
  },
  components: {
    NodeCard,
    PrButton,
  },
  methods:{
   filter(data){
   return NodeCardmethods.methods.filter(data)
   }
  },
    watch:{ 
      postid:{
        immediate:true,
        handler(val){
        axios.showComment({
          params:{
            postid:val
          }
         
        }).then(res =>{
        
          this.commont=res.data.message
        })
        }
      }
    }
  
};
</script>

<template>
  <div class="node-card" :style="{backgroundColor:color[note.imgurl]}">
    <div class="top">
      <p class="time">{{filter(Date.parse(note.moment)) }}</p>
      <p class="label">{{ label[note.label] }}</p>
    </div>
    <div class="message">
    {{ note.message }}
    </div>
    <div class="foot">
      <div class="foot-left">
        <span v-red-on-hover-click class="iconfont icon-favorites">{{ note.comment }}</span>
        <span v-red-on-hover class="iconfont icon-comments">{{ note.like }}</span>
      </div>
      <div class="name">{{ note.name }}</div>
    </div>
  </div> 
</template>

<style lang="scss" scoped>
@font-face {       
    font-family:fa;
    src: url('@/assets/阿里妈妈数黑体/Alimama_ShuHeiTi_Bold.ttf');
}
.node-card {
    opacity: 0.68;
  height: 12rem;
  width: 13rem;
  background-color: rgba(252, 175, 162, 0.3);
  box-sizing: border-box;
  position: relative;
 margin-top: 1.925rem;
  margin-left: 2rem;
  .top{
    display: flex;
    justify-content: space-between;
    padding: 0 .625rem;
    p{
        font-size: .75rem;
        color: $gray-3;
    }
  }
  .message{
    height: 6.75rem;
    font-family:fa; 
    color: $gray-1;
    letter-spacing: 0;
    line-height: 1.375rem;
    text-align: justify;
    padding: 0 .75rem;
    display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  cursor: pointer;
}
.foot{
    display: flex;
    justify-content: space-around;
    position: absolute;
    bottom: .125rem;
  
    left: 0;
    width: 100%;
    .name{
        cursor: pointer;
        font-weight: 600;
        font-size: .675rem;
        margin-right: -0.625rem;
    }
    .foot-left{
      
        width: 5.75rem;
        display: flex;
      
        align-items: center;
        span{
           margin-right: 1.25rem;
            cursor: pointer;
            font-size:.75rem;
           
            line-height: 1rem;

        }
        .iconfont{
            font-size: 0.7rem;
        }
       
    }
}
}
</style>

<script>
import "@/assets/iconfont/iconfont.css";
import {label } from "@/utils/data";
import moment from "moment";

export default {
  directives: {
  'red-on-hover-click': {
    mounted(el) {
      el.style.transition = 'color 0.8s';
      let clicked = false;
      el.addEventListener('click', function () {
        if (!clicked) {
          this.style.color = 'red';
          clicked = true;
        } else {
          this.style.color = '';
          clicked = false;
        }
      });
      el.addEventListener('mouseenter', function () {
        if (!clicked) {
          this.style.color = 'red';
        }
      });
      el.addEventListener('mouseleave', function () {
        if (!clicked) {
          this.style.color = '';
        }
      });
    }
  },
  'red-on-hover': {
    mounted(el) {
      el.style.transition = 'color 0.8s';
      el.addEventListener('mouseenter', function () {
        this.style.color = 'red';
      });
      el.addEventListener('mouseleave', function () {
        this.style.color = '';
      });
    }
  }
},
    data(){
        return {
            label,
            color:['rgba(252,175,162,0.30)','rgba(255,227,148,0.30)','rgba(146,238,245,0.30)','rgba(168,237,138,0.30)','rgba(202,167,247,0.30)','rgba(212,212,212,0.30)'],
        }
    },
 props:{
    note:{
        Type:[Object,String],
        default:{}
    }
 },
    methods:{
      filter(data){
       return moment(data).format('YYYY-MM-DD')
      }
    }
};
</script>

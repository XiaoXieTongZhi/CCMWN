<template>
  <div class="new-card">
    <div class="color-card">
      <p
        class="color-li"
        v-for="(e, index) in cardcolortwo"
        :key="index"
        :style="{ backgroundColor: e }"
        :class="{ colorselected: index == selected }"
        @click="changeColor(index)"
      ></p>
    </div>
    <div class="card-main" :style="{ backgroundColor: cardcolor[selected] }">
      <textarea
        placeholder="输入500字以内的留言内容"
        class="message"
        maxlength="500"
        v-model="message"
      ></textarea>
      <input type="text" placeholder="个人名称" class="name" disabled />
    </div>
   

    <van-uploader
      :after-read="afterRead"
      v-model="fileList"
      multiple
      :max-count="1"
      preview-size="4rem"
      :preview-options="{'closeable':true}"
    
    >
      <van-button size="small" icon="add-o" type="primary" >上传图片</van-button>
    </van-uploader>
    <div class="labels" >
      <p class="title" > 选择标签</p>
      <div class="label">
      <p v-for="(data,index) in label"  :key="index" class="label-li" :class="{labelselected:index==labelselected}" @click="changelabel(index)">{{ data }}</p>
    </div>
    </div>
    <div class="mz">
        <p class="title">免责声明</p>
        <p class="mzsm">
          CCMWN校园留言墙网站(以下简称“本网站”)提供一个交流平台，供用户发布各种类型的内容，包括但不限于日常趣事分享、学习交流、同校二手物品线下交易等。<br>

1.本网站不对用户发布的内容进行审核，也不对用户发布的内容的真实性、准确性、合法性负责。用户在本网站发布的内容仅代表用户个人观点，与本网站无关。<br>

2.用户在使用本网站时，应遵守当地法律法规，不得发布违法信息。如有违反，由用户自行承担法律责任。如果用户发布的内容违反了法律法规，本网站会积极配合相关部门进行调查，并向相关部门提供用户信息。<br>
3.本网站有权在任何时间删除违法信息，并保留追究相关责任人法律责任的权利。<br>
        </p>
    </div>
    <div class="footbt">
<pr-button class="button" :size="'max'" :nom="'secondary'" @click=" closeModal(0)">关闭</pr-button>
<pr-button class="button" :size="'max'" >发布</pr-button>
    </div>
  </div>
</template>

<script>
import { cardcolor, cardcolortwo } from "@/utils/data";
import  {label} from '@/utils/data';
import PrButton from "./PrButton.vue";
export default {
  data() {
    return {
        label,
      cardcolor,
      cardcolortwo,
      selected: 0, //当前选择的颜色
      //文件上传的图片数组
      fileList: [],
      //标签
      labelselected:0,
      //留言信息 存储
      message:'',
      //签名
      name:'',
    };
  },
  components:{
    PrButton
  },
  methods: {
    changeColor(index) {
      this.selected = index;
    },
    changelabel(index){
        this.labelselected = index
    },
    //关闭侧边栏
    closeModal(data){
      this.$emit('addclose',data)
    },
   
    //文件上传vant方法
    afterRead(file) {
      file.status = "uploading";
      file.message = "上传中...";
      setTimeout(() => {
        file.status = "success";
        file.message = null;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
  
.new-card {
  padding: 0 $padding-20;

  .color-card {
    padding-bottom: $padding-12;
    display: flex;
    align-items: center;

    .color-li {
      width: 1.3rem;
      height: 1.3rem;
      margin-right: $padding-8;
    }

    .colorselected {
      border: 1px solid rgba(59, 115, 240, 1);
    }
  }

  .card-main {
    height: 15rem;
    width: 100%;
    padding: 0.75rem;
    box-sizing: border-box;
    margin-bottom: .625rem;
    transition: all 0.5s;
    .message {
      background: none;
      border: none;
      resize: none;
      height: 11.75rem;
      width: 100%;
      font-size: 0.875rem;
      padding: 0.45rem 0;
      box-sizing: border-box;
    }

    .name {
      width: 100%;
      box-sizing: border-box;
      padding: $padding-8;
      background: none;
      border: none;
      height: 1.55rem;
      line-height: 1.55rem;
      font-family: fa;
      font-size: 0.75rem;
    }
  }
 
    .labels{
        overflow: hidden;
    }
    .title{
        overflow: hidden;
        margin-top: 0;
        font-family: fa;
        color: $gray-1;
        font-weight: 600;
        padding-top: 1.875rem;
        margin-bottom: 0;
    }
    .label{
        display: flex;
        flex-wrap: wrap;
       
        .label-li{
         
            padding: .125rem .6rem 0px;
            border-radius: 1.25rem;
            margin: $padding-20 .3125rem;
            cursor: pointer;
            transition: all 0.3s;
        }
        .labelselected{
            background: #ebeb;
            font-weight: 600;
        }
}
.mzsm{
  font-size: .75rem;
  color: $gray-3;
  padding-top: .325rem;
}
.footbt{
  padding: $padding-20;
  display: flex;
 justify-content: space-around;
 align-items: center;
   .button{
    margin-left: 10px;
    cursor: pointer;
   }
}
}
</style>

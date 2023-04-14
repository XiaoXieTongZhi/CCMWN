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
        placeholder="输入留言内容"
        class="message"
        maxlength="500"
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
            1.本网站允许用户发布内容，但对用户发布的内容不承担任何责任。用户在本网站发布的内容仅代表用户个人观点，与本网站无关。<br>

2.本网站不对用户发布的内容的准确性、可靠性、完整性和及时性作出任何保证。用户应自行判断内容的真实性，并对使用本网站提供的信息承担风险。<br>

3.本网站有权在不通知用户的情况下删除或修改用户发布的内容，但不对此承担任何责任。<br>

4.如果用户发布的内容违反了法律法规，本网站会积极配合相关部门进行调查，并向相关部门提供用户信息。<br>

5.使用本网站即表示您同意本免责声明。如果您不同意本免责声明，请立即停止使用本网站。

        </p>
    </div>
  </div>
</template>

<script>
import { cardcolor, cardcolortwo } from "@/utils/data";
import  {label} from '@/utils/data'
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
    };
  },
  methods: {
    changeColor(index) {
      this.selected = index;
    },
    changelabel(index){
        this.labelselected = index
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
      padding: $padding-8;
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
}
</style>

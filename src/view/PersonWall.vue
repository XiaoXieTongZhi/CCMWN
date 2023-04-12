<template>
    <div class="personwall">
        

        <p class="title">
          用户姓名
        </p>
        
        <p class="slogan">
            用户签名
        </p>
        <div class="label">
            <p class="label-list"  :class="{lbselected:nlabel == -1}" @click="selectNode(-1)">发布的帖子</p>
            <p class="label-list" :class="{lbselected:nlabel == index}" @click="selectNode(index)" v-for="(item, index) in userlabel" :key="index">
                {{ item }}
            </p>

          </div>
    </div>

</template>

<style lang="scss" scoped>

.personwall {
    
    box-sizing: border-box;
    min-height: 700px;
    padding-top: 4.125rem;
    overflow: hidden;
    padding-bottom: 0.5rem;
  
    .title {
        font-size: 3.5rem;
        color: $gray-1;
        text-align: center;
        font-weight: 600;
        padding-top: 1rem;
        padding-bottom: $padding-8;
    }

    .slogan {
        font-size: 1.1rem;
        color: $gray-2;
        text-align: center;
    }
    .label{
        font-size: .7125rem;
        display: flex;
        justify-content: center;
        margin-top: 2.5rem;
        .label-list{
            cursor: pointer;
            padding: 0 14px;
            line-height: 1.75rem;
            margin: $padding-4;
            color: $gray-2;
            box-sizing: border-box;
        }
        .lbselected{
            color: $gray-1;
            font-weight: 600;
            border: 1px solid $gray-1;
            border-radius: 14px;

        }
    }
   
}
</style>


<script>
import {  userlabel } from "@/utils/data";

export default {
    data(){
        return {
        
            userlabel,
            nlabel:-1,
        }
    },
    components:{
     
    },
    methods:{
        selectNode(e) {
          this.nlabel =e
        },
    }

}
</script>
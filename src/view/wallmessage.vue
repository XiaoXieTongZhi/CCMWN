<template>
    <div class="wall-message">
       <div class="night">
        <back-ground></back-ground>
       </div>
        <p class="title">
            {{ wallType.name }}
        </p>
        
        <p class="slogan">
            {{ wallType.slogan }}
        </p>
        <div class="label">
            <p class="label-list"  :class="{lbselected:nlabel == -1}" @click="selectNode(-1)">全部</p>
            <p class="label-list" :class="{lbselected:nlabel == index}" @click="selectNode(index)" v-for="(item, index) in label" :key="index">
                {{ item }}
            </p>

          </div>
          <div class="card">
            <node-card v-for="(data,index) in note" :key="index" :note="data" class="card-children"></node-card>
          </div>
    </div>
</template>

<script>
import { wallType, label } from "@/utils/data";
import NodeCard from '@/components/NodeCard.vue';
import  BackGround from '@/components/BackGround.vue';
import {note} from '../../mock/index';
export default {
    data() {
        return {
            wallType,
            label,
            nlabel:-1,
            note:note.data
        };
    },
    methods:{
        selectNode(e) {
          this.nlabel =e
        }
    },
    components:{
        NodeCard,
        BackGround
    }
};
// console.log(label);
</script>
<style lang="scss" scoped>
.wall-message {
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
    .card{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
     
    }
}
</style>

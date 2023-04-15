<template>
    <div class="card-detail">
      <div class="top-bt">
        <p class="revoke">联系墙主撕掉该便签</p>
        <p class="report">举报</p>
      </div>
      <node-card :note="card" class="nodecard"></node-card>
    </div>
</template>

<style lang="scss" scoped>
.card-detail{
    .nodecard{
        margin-left: 1.3625rem;
    }
    .top-bt{ 
     
        height: 0px;
        padding: $padding-20;
        align-items: center;
        justify-content: center;;
        display: flex;
        .revoke{
            color:$primary-color;
            cursor: pointer;
            padding-right: 1.875rem;
            font-size: $size-16;

        }
        .report{
            font-size: $size-16;
            cursor: pointer;
            color: $warning-color;
        }

    }
}
</style>



<script>
import NodeCard from './NodeCard.vue';
export default {
    data(){
        return[

        ]
    },
    props:{
        card:{
            Type:[String,Object],
            default:{}
        }
    },
    components:{
        NodeCard
    }
}

</script>
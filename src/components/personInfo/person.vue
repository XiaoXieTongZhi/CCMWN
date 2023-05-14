<template>
    <div class="body" >
        <div class="bgc" :style="{ 'background-image': `url(http://localhost:3000/uploads/img/默认.png)` }"></div>
      
         <top-info></top-info>
    <option-content></option-content>
    <foot-content></foot-content>
    
    </div>
</template>

<style lang="scss" scoped>
    .body{
        .bgc{
            width: 100%;
            height: 100%;
            opacity: 0.2;
            position: absolute;
            z-index: -1;
            background-position: center;
        }
       
        position: relative;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }
</style>

<script>
import FootContent from './FootContent.vue';
import OptionContent from './OptionContent.vue';
import TopInfo from './TopInfo.vue';
export default{

    components:{
        FootContent,
        OptionContent,
        TopInfo
    }
}

</script>
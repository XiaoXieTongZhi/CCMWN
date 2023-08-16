<template>
    <div class="body" >
        <div class="bgc" :style="{ 'background-image': `url(${baseImgPath}/uploads/bgcimg/${$store.state.personMessage.bgcpicture})` }"></div>
      <div class="message">
        <top-info @followsclick="followsclick"></top-info>
    <option-content @changeoption="changeoption"></option-content>
    <foot-content v-if="!$store.state.feedbackisshow"  :type="optionvalue"></foot-content>
    <feed-backs v-else :followdata="followdata"></feed-backs>
      </div>
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
            background-position:center;
            background-size: cover;
        }
       .message{
       height: 100%;
       overflow: scroll;
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
import { baseImgPath } from "@/utils/env";
import FootContent from './FootContent.vue';
import OptionContent from './OptionContent.vue';
import TopInfo from './TopInfo.vue';
import FeedBacks from './FeedBacks.vue';
export default{
    data(){
        return {
            optionvalue:1,
            followdata:'',
            baseImgPath
        }
    },
    components:{
        FootContent,
        OptionContent,
        TopInfo,
        FeedBacks
    },
    methods:{
        followsclick(data){
           this.followdata=data
        },
        changeoption(value){
            this.optionvalue=value;
        }
    }
}
</script>
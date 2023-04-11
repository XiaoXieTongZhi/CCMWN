<template>
    <div  class="modal">
        <div class="modal-head">
            <p class="modal-name">写留言</p>
            <span class="iconfont icon-close"></span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .modal{
        width: 13.75rem;
        height: 100%;
        background-color: rgba(255,255,255,0.80);
        box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.08);
        backdrop-filter: blur(15px);
        position: fixed;
        right: 0;
        top: 4.05rem;
        z-index: 100;
        padding: $padding-20;
        box-sizing: border-box;
        .modal-head{
            display: flex;
            justify-content: space-between;
            .modal-name{
                font-size: 1rem;
                color: $gray-1;
             
                font-weight: 600;
            }
        }
    }




</style>



<script>
export default{

}
</script>
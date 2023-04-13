<template>
    <div class="new-card">
        <div class="color-card">
            <p class="color-li" v-for="(e, index) in cardcolortwo" :key="index" :style="{ backgroundColor: e }"
                :class="{ colorselected: index == selected }" @click="changeColor(index)"></p>
        </div>
        <div class="card-main" :style="{ backgroundColor: cardcolor[selected] }">
            <textarea placeholder="输入留言内容" class="message" maxlength="500"></textarea>
            <input type="text" placeholder="个人名称" class="name" disabled>
        </div>
        <div class="labels">
            <p class="title"></p>
        </div>
        <van-uploader :after-read="afterRead" />
    </div>

    <!-- 测试 vant -->
    <div>
        <van-button type="primary">主要按钮</van-button>
        <van-button type="success">成功按钮</van-button>
        <van-button type="default">默认按钮</van-button>
        <van-button type="warning">警告按钮</van-button>
        <van-button type="danger">危险按钮</van-button>
    </div>
</template>



<script >
import { cardcolor, cardcolortwo } from '@/utils/data'
export default {
    data() {
        return {
            cardcolor,
            cardcolortwo,
            selected: 0,//当前选择的颜色
        }
    },
    methods: {
        changeColor(index) {
            this.selected = index
        },
        afterRead(file) {
            console.log(file);
        }
    }
}

</script>



<style  lang="scss" scoped>
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
        padding: .75rem;
        box-sizing: border-box;

        .message {
            background: none;
            border: none;
            resize: none;
            height: 11.75rem;
            width: 100%;
            font-size: .875rem;
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

            @font-face {
                font-family: fa;
                src: url('@/assets/阿里妈妈数黑体/Alimama_ShuHeiTi_Bold.ttf');
            }

            font-family: fa;
            font-size: .75rem;
        }
    }
}
</style>
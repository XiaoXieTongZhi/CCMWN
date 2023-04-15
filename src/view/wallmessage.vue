<template>
    <div class="wall-message">

        <p class="title">
            {{ $store.state.school }}
        </p>
        <div class="school">
   <school-select></school-select>
       </div>
        <p class="slogan">
            {{ wallType.slogan }}
        </p>
        <div class="label">
            <p class="label-list" :class="{ lbselected: nlabel == -1 }" @click="selectNode(-1)">全部</p>
            <p class="label-list" :class="{ lbselected: nlabel == index }" @click="selectNode(index)"
                v-for="(item, index) in label" :key="index">
                {{ item }}
            </p>

        </div>
        <div class="card">
            <node-card v-for="(data, index) in note" :key="index" :note="data" class="card-children"></node-card>
        </div>
        <div class="add" :style="{ bottom: addBottom + 'px' }" @click='changeModal' v-show="!modal">
            <span class="iconfont icon-add"></span>
        </div>
        <modal :title="'写下你的留言'" @close="changeModal($event)" :isModal="modal">
            <new-card  @addclose='changeModal'></new-card>
        </modal>
    </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import "@/assets/iconfont/iconfont.css";
import { wallType, label } from "@/utils/data";
import NodeCard from '@/components/NodeCard.vue';
import NewCard from "@/components/NewCard.vue";
import { note } from '../../mock/index';
import SchoolSelect from '@/components/SchoolSelect.vue';
export default {
    components: {
        NodeCard,
        Modal,
        NewCard,
        SchoolSelect
    },
    data() {
        return {
            wallType,
            label,
            nlabel: -1,
            note: note.data,
            addBottom: 30,//按钮上下效果
            modal: true,

        };
    },
    mounted() {
        window.addEventListener('scroll', this.scrollBottom)

    },
    unmounted() {
        window.addEventListener('scroll', this.scrollBottom)
    },

    methods: {
        selectNode(e) {
            this.nlabel = e
        },
        scrollBottom() {
            //距离顶部高度
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //可见内容高度
            let clientHeight = document.documentElement.clientHeight;
            //整个内容高度
            let scrollHeight = document.documentElement.scrollHeight;
            if (scrollTop + clientHeight + 200 >= scrollHeight) {
                if (document.documentElement.clientWidth > 940) {
                    this.addBottom = (scrollTop + clientHeight + 300 - scrollHeight);
                } else {
                    this.addBottom = (scrollTop + clientHeight + 200 - scrollHeight);
                }
            } else {
                this.addBottom = 30
            }
        },
        //切换侧边栏
        changeModal() {
            this.modal = !this.modal
        }


    },
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

    .label {
        font-size: .7125rem;
        display: flex;
        justify-content: center;
        margin-top: 2.5rem;

        .label-list {
            cursor: pointer;
            padding: 0 14px;
            line-height: 1.75rem;
            margin: $padding-4;
            color: $gray-2;
            box-sizing: border-box;
        }

        .lbselected {
            color: $gray-1;
            font-weight: 600;
            border: 1px solid $gray-1;
            border-radius: 14px;

        }
    }

    .card {
        display: flex;
        flex-wrap: wrap;
        width: 100%;

    }

    .add {
        width: 3.5rem;
        height: 3.5rem;
        background-color: $gray-1;
        box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
        border-radius: 50%;
        position: fixed;
        right: 1.875rem;
        transition: all 1.5s;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 30;

        .icon-add {
            color: $gray-10;
            font-size: 1.5rem;
        }
    }
}</style>

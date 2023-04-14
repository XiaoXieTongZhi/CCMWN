<template>
  <Transition name="modal">
    <div class="modal" v-if="isModal" id="modal" :style="{ height: modalHeight }">
      <div class="modal-head" ref="modalHead">
        <p class="modal-name">{{ title }}</p>
        <span class="iconfont icon-close" @click="closeModal()"></span>
      </div>
      <div class="modal-main" :style="{ height: modalMainHeight }">
    
        <div class="slot">
          <slot></slot>
        </div>
      </div>

    </div>

  </Transition>
</template>

<script>
import { inject, ref, onMounted, onBeforeUnmount } from 'vue'
import debounce from '@/utils/debounce' // 防抖函数
export default {
  inject: ['bus'],
  setup() {
    const bus = inject('bus')
    let modalHeight = ref('0')
    let modalHead = ref(null)
    let modalMainHeight = ref('')


    const changeHeight = debounce(() => {
      bus.modalHeight = window.innerHeight - bus.getTopBarHeight()
      bus.modalHeadHeight = modalHead.value ? modalHead.value.offsetHeight : bus.modalHeadHeight
      bus.modalMainHeight = bus.modalHeight - bus.modalHeadHeight
      modalHeight.value = bus.modalHeight + 'px'
      modalMainHeight.value = bus.modalMainHeight + 'px'
    })

    let changeEvent = () => {
      changeHeight()
    }

    onMounted(() => {
      changeHeight()
      window.addEventListener('resize', changeEvent)
    })

    // 组件卸载前移出事件
    onBeforeUnmount(() => {
      window.removeEventListener('resize', changeEvent)
    })


    return { modalHeight, modalHead, modalMainHeight }
  },
  props: {
    title: {
      Type: String,
      default: "标题",
    },
    isModal: {
      Type: Boolean,
      default: false,
    },
  },
  methods: {
    //中间人事件调用父组件
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-enter-active {
  animation: an 0.5s;
}

/* 出场动画 */
.modal-leave-active {
  animation: an 0.5s reverse;
}

@keyframes an {
  0% {
    opacity: 0;
    transform: translateX(13.75rem);
  }

  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}

.modal {
  width: 13.75rem;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(15px);
  position: fixed;
  margin-bottom: 3rem;
  right: 0;
  top: 4.05rem;
  z-index: 31;
  box-sizing: border-box;
  transition: height .5s;
  overflow: hidden;

  .modal-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: $padding-20;
    box-sizing: border-box;

    .modal-name {
      font-size: 1rem;
      color: $gray-1;

      font-weight: 600;
    }

    .icon-close {
      color: $gray-2;
      cursor: pointer;
      font-size: 1rem;
    }
  }

  .modal-main {
    width: 100%;
    // height: 22.5rem;
    // overflow: auto;
    box-sizing: border-box;
  }

  .slot {
    min-height: 100%;
    max-width: 100%;
    height: 100%;
    overflow: auto;
    // height: 31.25rem;
    // background-color: #eee;
    // border-radius: 1.875rem;
  }
}
</style>

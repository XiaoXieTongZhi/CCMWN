<template>
  <Transition name="modal">
    <div class="modal" v-if="isModal" id="modal">
      <div class="modal-head">
        <p class="modal-name">{{ title }}</p>
        <span class="iconfont icon-close" @click="closeModal()"></span>
      </div>
      <div class="modal-main">
        <slot></slot>
        <div class="slot">
          <div></div>
        </div>
      </div>

    </div>

  </Transition>
</template>

<style lang="scss" scoped>
.modal-enter-active {
  animation: an 1.5s;
}

/* 出场动画 */
.modal-leave-active {
  animation: an 1.5s reverse;
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
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 13.75rem;
  height: 100vh; // 问题出在这里， 高度不应该为 100vh ， 应该为视口高度减去 top导航栏高度
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(15px);
  position: fixed;
  margin-bottom: 3rem;
  right: 0;
  top: 4.05rem;
  z-index: 31;
  box-sizing: border-box;
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
    flex: 1;
    width: 100%;
    // height: 22.5rem;
    // overflow: auto;
    box-sizing: border-box;
  }

  .slot {
    min-height: 100%;
    max-height: 100%;
    overflow: auto;
    // height: 31.25rem;
    background-color: #eee;
    border-radius: 1.875rem;
  }
}
</style>

<script>
export default {
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

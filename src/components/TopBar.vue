<template>
    <div class="top-bar" ref="topBar">
        <div class="logo">
            <img src="@/assets/logo.png" class="logo-img" alt="">
            <p class="logo-name">CCMWN</p>
        </div>
        <div class="menu">

            <router-link to="/wall">
                <pr-button :size="'max'" :nom="$route.path == '/wall' ? 'primary' : 'secondary'"
                    class="menu-message"> {{ $store.state.school }}</pr-button>
            </router-link>
            <router-link to="/personwall">
                <pr-button :size="'max'" :nom="$route.path == '/personwall' ? 'primary' : 'secondary'"
                    class="menu-mine">个人空间</pr-button>
            </router-link>

        </div>
  
        <div class="user">
            <div class="user-head">

            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.top-bar {

    width: 100%;
    height: 4.05rem;
    background-color: rgba(255, 255, 255, 0.80);
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(3px);
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 99;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.875rem;
    box-sizing: border-box;

    .logo {
        width: 6.25rem;
        display: flex;
        align-items: center;

        .logo-img {
            width: 1.5rem;
            height: 1.5rem;
        }

        .logo-name {
            font-size: 1.05rem;
            color: $gray-1;
            font-weight: 3.75rem;
            padding-left: .625rem;

        }

    }

    .user {
        width: 6.25rem;

        .user-head {
            float: right;
            border-radius: 50%;
            height: 1.5rem;
            width: 1.5rem;
            background-image: linear-gradient(180deg, #7BE7FF, #1E85E2);

        }
    }

    .menu {
        display: flex;
        align-items: center;

        .menu-message {
            margin-right: 1.5rem;
        }
    }

}
</style>

<script>
import PrButton from '@/components/PrButton.vue'

import { inject, ref } from 'vue'

export default {
    setup() {
        const bus = inject('bus')
        let topBar = ref(null)
        bus.getTopBarHeight = () => {
            return +topBar.value.clientHeight
        }

        return { topBar }
    },
    components: {
        PrButton,
   
    },


}


</script>
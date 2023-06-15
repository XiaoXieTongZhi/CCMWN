<template>
    <div class="index" :class="$store.state.mode === 1 ? 'sun' : 'moon'">
        <back-ground></back-ground>
        <top-bar :username="pvalue"></top-bar>
        <login @update-topbar-value="handleUpdateTopbarValue"></login>

        <router-view> </router-view>
        <live-two class="live2d"></live-two>
        <foot-bar></foot-bar>
    </div>
</template>

<script>
import LiveTwo from "@/components/live2d/live2d.vue";
import TopBar from "@/components/TopBar";
import FootBar from "@/components/FootBar.vue";
import BackGround from "@/components/BackGround.vue";
import login from "@/components/login.vue";
export default {
    data() {
        return {
            pvalue: "",
        };
    },
    mounted() {
        document.documentElement.scrollTop = 700.79998;
    },
    components: {
        LiveTwo,
        TopBar,
        FootBar,
        BackGround,
        login,
    },
    computed: {
        comname() {
            return this.$store.state.personMessage.name;
        },
    },
    watch: {
        comname(newvalue) {
            this.pvalue = newvalue;
        },
    },
    created() { },
    methods: {
        handleUpdateTopbarValue(newvalue) {
            this.pvalue = newvalue;
        }
    },
};
</script>

<style lang="scss" scoped>
.sun {
    background: radial-gradient(circle at center top,
            red 0%,
            orange 50%,
            #eee8aa 100%);
}

.moon {
    background: radial-gradient(circle at center top,
            #00008b 0%,
            skyblue 50%,
            lightblue 100%);
}
</style>

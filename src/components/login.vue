<template>
    <van-overlay :show="show" :z-index="'99'">
        <div class="login">
            <van-form @submit="onSubmit" >

                <van-cell-group inset>
                    <van-icon name="cross" size="1.25rem" @click="closelogin"/>
                    <van-field v-model="username" name="用户名" label="用户名" placeholder="字母和中文"
                        :rules="[{ required: true, message: '用户名最高不能超过六位', pattern: /^[a-zA-Z\u4e00-\u9fa5]{1,6}$/ }]" />
                    <van-field v-model="password" type="password" name="密码" label="密码" placeholder="字母和数字"
                        :rules="[{ required: true, message: '请填写长度为6的密码', pattern: /^(?=.*[a-zA-Z\d]).{6,}$/ }]" />
                </van-cell-group>
                <div style="margin: 16px;" class="button">
                    <van-button round block :size="'small'" type="primary" native-type="submit">
                        登录
                    </van-button>
                    <van-button round block :size="'small'" type="primary" native-type="submit">
                        注册
                    </van-button>
                </div>

            </van-form>
        </div>
    </van-overlay>
</template>


<script>


export default {
    data() {
        return {
            show: false,
            username: '',
            password: ''
        }
    },
    methods: {
        closelogin() {
       
             this.$store.commit('changeModal')
        }
    },
    computed: {
        showChange() {
            return this.$store.state.isModal
        }
    },
    watch: {
        showChange() {
            this.show = this.$store.state.isModal
        }
    }
}

</script>



<style lang="scss" scoped>
.login {
    margin: 15.25rem auto;
    width: 35%;
    height: 50%;
}

.button {
    display: flex;
    justify-content: space-between;
}

:deep(.van-button) {
    min-width: 120px;
    width: 5.375rem;
}

:deep(.van-icon) {
    float: right;
    cursor: pointer;
}

:deep(.van-cell-group) {
    min-width: 250px;
}
</style>
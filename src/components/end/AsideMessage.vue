<template>
    <div class="body">

        <el-tag size="large" class="ml-2" type="success" @click="changeForm('users')">
            <h2>users表</h2>
            <h3>——设置用户权限,审核姓名头像等</h3>
        </el-tag>
        <el-tag size="large" class="ml-2" type="info" @click="changeForm('posts')">
            <h2>posts表</h2>
            <h3>——审核用户发布的帖子等</h3>
        </el-tag>
        <el-tag size="large" class="ml-2" type="warning" @click="changeForm('follows')">
            <h2>follows表</h2>
            <h3>——查看关注关系</h3>
        </el-tag>
        <el-tag size="large" class="ml-2" type="danger" @click="changeForm('feedbacks')">
            <h2>feedbacks表</h2>
            <h3>——查看卡片反馈信息</h3>
        </el-tag>
        <el-tag size="large" class="ml-2" type="warning" @click="changeForm('comments')">
            <h2>comments表</h2>
            <h3>——审核用户评论</h3>
        </el-tag>
        <el-tag size="large" class="ml-2" type="danger" @click="changeForm('system_messages')">
            <h2>system_messages</h2>
            <h3>——添加系统消息，回复用户审核结果等</h3>
        </el-tag>

    </div>
</template>

<style lang="scss" scoped>
.body {
    background-color: rgb(201, 201, 193);
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .m1-2 {
        cursor: pointer;
        flex: 1;
    }

    .el-tag--large {
        height: 135px;
        cursor: pointer;
        opacity: 0.8;
    }

    .el-tag--large:hover {
        opacity: 1;
    }
}
</style>


<script>

import { mapMutations, mapActions, mapState } from 'vuex';

export default {
    data() {
        return {

        }
    },

    methods: {
        ...mapActions(['changeForm']),

    },
  
  

    created() {
        this.changeForm()
    }
}


</script>
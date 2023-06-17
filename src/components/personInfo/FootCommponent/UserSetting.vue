<template>
  <div class="body">
    <div class="user-head">
      <div>头像设置</div>
      <div class="user-head-message">
        <van-uploader v-model="fileList" multiple :max-count="1" preview-size="4rem"
          :preview-options="{ closeable: true }" :max-size="2097152" :before-read="beforeRead" accept=".png, .jpg, .jpeg">
          <van-button size="small" icon="add-o" type="primary">上传图片</van-button>
        </van-uploader>
        <button class="btn" @click="submituserhead">提交</button>
      </div>
    </div>
    <div class="bgc-head">
      <div>背景设置</div>
      <div class="bgc-head-message">
        <van-uploader v-model="fileListtwo" multiple :max-count="1" preview-size="4rem"
          :preview-options="{ closeable: true }" :max-size="2097152" :before-read="beforeRead" accept=".png, .jpg, .jpeg">
          <van-button size="small" icon="add-o" type="primary">上传图片</van-button>
        </van-uploader>
        <button class="btn" @click="submitbgc">提交</button>
      </div>
    </div>
    <div class="user-name">
      <div>用户名称设置</div>
    <div class="name-tool">
      <input class="name-input" type="text" v-model="newName" placeholder="新名称不能超过五位" maxlength="5" title="字母和中文不能超过五位">
    <button class="btn" @click="updateName">确定</button>
    </div>
    </div>
    <div class="campus-certification">
      <div>校园信息设置</div>

    </div>
    <div class="personal-signature">
      <div>个性签名设置</div>
    </div>
    <div class="c-authentication">
      <div>C认证设置</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.name-tool {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
}

.name-input {
  padding: 5px;
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 5px;
}

.btn {
  padding: 5px 10px;
  font-size: 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}
.body {
  height: 100%;

  .user-head,
  .bgc-head,
  .user-name,
  .personal-signature,
  .campus-certification,
  .c-authentication {
    height: 35%;
    border-bottom: 1px solid black;
    text-align: center;
    font-weight: 600;

    .user-head-message,
    .bgc-head-message {
      height: 70%;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .btn {
        display: inline-block;
        padding: 10px 20px;
        background-color: #42b983;
        color: #fff;
        width: 70px;
        height: 30px;
        line-height: 10px;
        border: none;
        border-radius: 5px;
        font-size: 12px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }

      .btn:hover {
        background-color: #389e6e;
      }
    }
  }
}
</style>

<script setup>
import * as axios from "@/api/index";
import { useStore } from "vuex";
import { ref, reactive,watch } from "vue";
import { showToast } from "vant";
//图片信息状态存储
const data = reactive({
  fileList: [],
  fileListtwo: [],
  newName:''
});
const fileList = ref(data.fileList);
const fileListtwo = ref(data.fileListtwo);
const newName = ref(data.newName)
let store = useStore();
const updateName=()=>{
  if (/^[\u4e00-\u9fa5a-zA-Z]{1,5}$/.test(newName.value)) {
    
 

  //发起请求后台数据库内容
  axios.updatename({
    userid:store.state.userid,
    username:newName.value
  }).then(res=>{
    console.log(res.data.code);
    if (res.data.code==200) {
      store.commit('changename',res.data.data);
    }
    showToast({
      message: "姓名修改成功",

      style: {
        backgroundColor: "transparent",
        fontWeight: "600",
      },
    });
   
  }).catch(err => {console.log(err);})
} else {
  showToast({
      message: "新名称不符合要求",

      style: {
        backgroundColor: "transparent",
        fontWeight: "600",
      },
    });
}
}
const beforeRead = (file) => {
  //符合这两种情况 都取消上传 return false
  if (
    [".png", ".jpg", ".jpeg"].includes(
      file.name.replace(/.+\./, ".").toLowerCase()
    ) &&
    file.size <= 2097152
  ) {
    return true;
  } else {
    showToast({
      message: "上传格式不符合要求,支持.png, .jpg, .jpeg,并且要小于2MB",

      style: {
        backgroundColor: "transparent",
        fontWeight: "600",
      },
    });
  }
};
let submituserhead = () => {
  if (fileList.value[0]) {
    let formData = new FormData();
    formData.set("image", fileList.value[0].file);
    formData.set("userid", store.state.userid);
    axios.userhead(formData).then(res => {
      if (res.data.code == 200) {
        store.commit('changeuserhead', res.data.data)
        store.commit('changewatchuserhead', res.data.data)

        fileList.value = []
        showToast({
          message: res.data.message,

          style: {
            backgroundColor: "transparent",
            fontWeight: "600",
          },
        });
      }

    }).catch(err => console.log(err))
  } else {
    showToast({
      message: "请选择图片后，在进行提交",

      style: {
        backgroundColor: "transparent",
        fontWeight: "600",
      },
    });
  }
};


let submitbgc = () => {
  if (fileListtwo.value[0]) {
    let formData = new FormData();
    formData.set("image", fileListtwo.value[0].file);
    formData.set("userid", store.state.userid);
    axios.bgcpicture(formData).then(res => {
      if (res.data.code == 200) {
        console.log(res.data.data);
        store.commit('changebgcpicture', res.data.data)
        fileListtwo.value = []
        showToast({
          message: res.data.message,

          style: {
            backgroundColor: "transparent",
            fontWeight: "600",
          },
        });
      }

    }).catch(err => console.log(err))
  } else {
    showToast({
      message: "请选择图片后，在进行提交",

      style: {
        backgroundColor: "transparent",
        fontWeight: "600",
      },
    });
  }
};
</script>

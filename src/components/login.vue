<template>
  <van-overlay :show="show" :z-index="'99'">
    <div class="login">
      <van-form
        @submit="onSubmit($event)"
        ref="form"
        :show-error="true"
        :submit-on-enter="false"
      >
        <van-cell-group inset>
          <van-icon name="cross" size="1.25rem" @click="closelogin" />
          <van-field #input name="radio" label="状态">
            <van-radio-group v-model="checked" direction="horizontal">
              <van-radio name="1">登录</van-radio>
              <van-radio name="2">注册</van-radio>
              <van-radio name="3">找回</van-radio>
            </van-radio-group>
          </van-field>
          <van-field
            v-model="email"
            type="email"
            name="email"
            label="邮箱"
            placeholder="输入邮箱"
            :error-message="isuseremail"
            :rules="[
              {
                required: true,
                message: '邮箱格式不正确',
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              },
            ]"
          />
          <van-field
            v-if="checked == 2 || checked == 3"
            v-model="sms"
            name="sms"
            center
            clearable
            label="验证码"
            placeholder="请输入邮箱验证码"
            :error-message="iscode"
            :rules="[
              {
                required: true,
                message: '验证码不能空',
              },
            ]"
          >
            <template #button v-if="checked == 2 || checked == 3">
              <van-button
                size="small"
                type="primary"
                :disabled="isDisabled"
                @click="countDown(), code()"
              >
                {{ buttonText }}
              </van-button>
            </template>
          </van-field>
          <van-field
            v-if="checked == 2"
            v-model="username"
            type="text"
            name="username"
            label="用户名"
            placeholder="字母和中文"
            :error-message="isusername"
            :rules="[
              {
                required: true,
                message: '用户名最高不能超过5位',
                pattern: /^[a-zA-Z\u4e00-\u9fa5]{1,6}$/,
              },
            ]"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            :placeholder="passmessage"
            :error-message="ispass"
            :rules="[
              {
                required: true,
                message: '请填写长度大于为6的密码',
                pattern: /^(?=.*[a-zA-Z\d]).{6,}$/,
              },
            ]"
          />
        </van-cell-group>

        <div style="margin: 16px" class="button">
          <van-button
            round
            block
            :size="'small'"
            type="primary"
            native-type="submit"
          >
            确定
          </van-button>
        </div>
      </van-form>
    </div>
  </van-overlay>
</template>

<script>
import * as axios from "@/api/index";
import { showToast } from "vant";
export default {
  data() {
    return {
      //验证码
      sms: "",
      //显示信息
      buttonText: "发送验证码",
      //是否可用
      isDisabled: false,
      //倒计时
      count: 59,
      show: false,
      username: "",
      password: "",
      email: "",
      //修改账号提示内容
      isusername: "",
      //修改邮箱提示信息
      isuseremail: "",
      //修改验证码提示信息
      iscode: "",
      //修改密码错误提示信息
      ispass: "",
      checked: "1",
    };
  },
  methods: {
    code() {
      if (this.email == "") {
        this.isuseremail = "邮箱不能为空";
      } else {
        //判断邮箱是否通过
        if (
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email)
        ) {
          //注册
          if (this.checked == 2) {
            this.isuseremail = "";
            axios
              .sendCode({ ...this.$refs.form.getValues(), new: 1 })
              .then((res) => {
                if (res.data.code == 306) {
                  this.isuseremail = res.data.message;
                } else if (res.data.code == 201) {
                  this.isuseremail = res.data.message;
                } else if (res.data.code == 310) {
                  this.isuseremail = res.data.message;
                }
              })
              .catch((res) => {});
            //登录
          } else if (this.checked == 1) {
            this.isuseremail = "";
            this.ispass = "";
            //找回密码
          } else if (this.checked == 3) {
            this.isuseremail = "";
            axios
              .sendCode({ ...this.$refs.form.getValues() })
              .then((res) => {
                if (res.data.code == 306) {
                  this.isuseremail = res.data.message;
                } else if (res.data.code == 201) {
                  this.isuseremail = res.data.message;
                } else if (res.data.code == 310) {
                  this.isuseremail = res.data.message;
                } else if (res.data.code == 325) {
                  this.isuseremail = res.data.message;
                }
              })
              .catch((res) => {});
          }
        } else {
          this.isuseremail = "邮箱格式不正确";
        }
      }
    },
    countDown() {
      let timer;
      timer = setInterval(() => {
        if (
          this.email == "" ||
          this.isuseremail == "邮箱已存在" ||
          this.isuseremail == "邮箱不存在"
        ) {
          this.buttonText = "重新发送";
          this.isDisabled = false;
          this.count = 59;
          return clearInterval(timer);
        } else {
          //判断邮箱是否通过
          if (
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email)
          ) {
            if (this.count === 0) {
              clearInterval(timer);
              this.buttonText = "重新发送";
              this.isDisabled = false;
              this.count = 59;
              return;
            } else {
              this.buttonText = `${this.count} 秒后重发`;
              this.isDisabled = true;
              this.count--;
            }
          }
        }
      }, 1000);
    },
    closelogin() {
      this.$store.commit("changeModal");
    },
    onSubmit() {
      this.isusername = "";
      this.isuseremail = "";
      this.iscode = "";
      this.ispass = "";
      this.buttonText = "发送验证码";
      const formData = this.$refs.form.getValues();

      //注册
      if (this.checked == 2) {
        axios
          .insertUser({ ...formData, new: 1 })
          .then((res) => {
            if (res.data.code == 305) {
              this.isusername = res.data.messages;
            } else if (res.data.code == 306) {
              this.isusername = "";
              this.isuseremail = res.data.message;
            } else if (res.data.code == 310) {
              this.isusername = "";
              this.isuseremail = "";
              this.iscode = res.data.message;
            } else if (res.data.code == 320) {
              this.isusername = "";
              this.isuseremail = "";
              this.iscode = res.data.message;
            } else {
              this.isusername = "";
              this.isuseremail = "";
              this.iscode = "";

              this.$store.commit("changeModal");
              showToast({
                message: "注册成功",

                style: {
                  backgroundColor: "transparent",
                  fontWeight: "600",
                },
              });
              this.sms = "";
              this.username = "";
              this.password = "";
              this.email = "";
            }
          })
          .catch((err) =>
            showToast({
              message: err.data.message,

              style: {
                backgroundColor: "transparent",
                fontWeight: "600",
              },
            })
          );
        //登录
      } else if (this.checked == 1) {
        axios
          .loginUser({ ...formData, new: 1 })
          .then((res) => {
            if (res.data.code == 205) {
             
              this.$emit("update-topbar-value", res.data.username);
              this.isuseremail = "";
              this.ispass = "";
              this.$store.commit("changeModal");
              this.$store.commit("updateuserid", res.data.userid);
               this.$store.commit("updatename", res.data.username);
               
             if (res.data.avatar) {
                this.$store.commit('changeuserhead', res.data.avatar)
          
              }
              showToast({
                message: "登录成功,24小时内有效",
                style: {
                  backgroundColor: "transparent",
                  fontWeight: "600",
                },
              });
             
              this.sms = "";
              this.username = "";
              this.password = "";
              this.email = "";
             
            } else if (res.data.code == 315) {
              this.ispass = "";
              this.ispass = res.data.message;
            } else if (res.data.code == 325) {
              this.isuseremail = "";
              this.isuseremail = res.data.message;
            }
            this.$router.go(0)
          })
          .catch((err) =>
            showToast({
              message: err.data.message,

              style: {
                backgroundColor: "transparent",
                fontWeight: "600",
              },
            })
          );
        //找回密码
      } else if (this.checked == 3) {
        axios
          .searchUser({ ...formData, new: 1 })
          .then((res) => {
            if (res.data.code == 310) {
              this.iscode = res.data.message;
            } else if (res.data.code == 320) {
              this.isusername = "";
              this.isuseremail = "";
              this.iscode = res.data.message;
            } else if (res.data.code == 203) {
              this.iscode = "";
              this.$store.commit("changeModal");
              showToast({
                message: "密码修改成功",

                style: {
                  backgroundColor: "transparent",
                  fontWeight: "600",
                },
              });
              this.sms = "";
              this.username = "";
              this.password = "";
              this.email = "";
            }
          })
          .catch((err) =>
            showToast({
              message: err.data.message,

              style: {
                backgroundColor: "transparent",
                fontWeight: "600",
              },
            })
          );
      }
    },
  },
  computed: {
    showChange() {
      return this.$store.state.isModal;
    },
    passmessage() {
      if (this.checked !== "3") {
        return "字母和数字";
      } else {
        return "新密码";
      }
    },
  },
  watch: {
    showChange() {
      this.show = this.$store.state.isModal;
    },
  },
};
</script>

<style lang="scss" scoped>
.van-cell {
  border: 1px solid transparent;
  animation: border-animation 3s linear infinite;
  background: transparent;
}

.login {
  margin: 13.25rem auto;
  width: 35%;
  height: 50%;
}
@keyframes border-animation {
  0% {
    border-color: #a6c1ee;
  }
  25% {
    border-color: #fbc2eb;
  }
  50% {
    border-color: #a18cd1;
  }
  75% {
    border-color: #fbc2eb;
  }
  100% {
    border-color: #a6c1ee;
  }
}
.button {
  min-width: 21.25rem;
  max-width: 25rem;
  display: flex;
  justify-content: center;
}

:deep(.van-button) {
  background: linear-gradient(to right, #fbc2eb, #a6c1ee);
  color: black;
  min-width: 120px;
  width: 5.375rem;
  border: 3px solid transparent;
  animation: border-animation 3s linear infinite;
}

:deep(.van-icon) {
  float: right;
  cursor: pointer;
}

:deep(.van-cell-group) {
  min-width: 21.25rem;
  max-width: 25rem;
}
@keyframes gradient {
  0% {
    background: linear-gradient(to right, #fbc2eb, #a6c1ee);
  }
  25% {
    background: linear-gradient(to right, #a6c1ee, #fbc2eb);
  }
  50% {
    background: linear-gradient(to right, #fbc2eb, #a18cd1);
  }
  75% {
    background: linear-gradient(to right, #a18cd1, #fbc2eb);
  }
  100% {
    background: linear-gradient(to right, #fbc2eb, #a6c1ee);
  }
}
.van-cell-group--inset {
  animation: gradient 5s linear infinite;
  opacity: 0.8;
}
</style>

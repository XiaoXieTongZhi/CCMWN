<template>
  <div class="new-card">
    <div class="color-card">
      <p
        class="color-li"
        v-for="(e, index) in cardcolor"
        :key="index"
        :style="{ backgroundColor: e }"
        :class="{ colorselected: index == selected }"
        @click="changeColor(index, e)"
      ></p>
    </div>
    <div class="card-main" :style="{ backgroundColor: cardcolor[selected] }">
      <textarea
        placeholder="输入500字以内的留言内容"
        class="message"
        maxlength="500"
        v-model="message"
      ></textarea>
      <select class="name" ref="name">
        <option :value="computedname" class="option">{{ computedname }}</option>
        <option value="匿名" class="option">匿名</option>
      </select>
    </div>

    <van-uploader
      v-model="fileList"
      multiple
      :max-count="1"
      preview-size="4rem"
      :preview-options="{ closeable: true }"
      :max-size="2097152"
      :before-read=" beforeRead"
      accept=".png, .jpg, .jpeg"
    >
      <van-button size="small" icon="add-o" type="primary">上传图片</van-button>
    </van-uploader>
    <div class="labels">
      <p class="title">选择标签</p>
      <div class="label">
        <p
          v-for="(data, index) in label"
          :key="index"
          class="label-li"
          :class="{ labelselected: index == labelselected }"
          @click="changelabel(index, data)"
        >
          {{ data }}
        </p>
      </div>
    </div>
    <div class="mz">
      <p class="title">免责声明</p>
      <p class="mzsm">
        CCMWN校园留言墙网站(以下简称“本网站”)提供一个交流平台，供用户发布各种类型的内容，包括但不限于日常趣事分享、学习交流、同校二手物品线下交易等。<br />

        1.本网站会对用户发布的内容进行审核，以确保内容的真实性、准确性和合法性。然而，审核并不代表本网站对内容的完全担保或保证。用户在本网站发布的内容仅代表用户个人观点，与本网站无关。<br />

        2.用户在使用本网站时，应遵守当地法律法规，并承诺不会发布违法信息。用户应对其发布的内容负责，并确保其合法性。如果用户发布的内容违反了法律法规，用户将自行承担相应的法律责任。本网站会积极配合相关部门进行调查，并向相关部门提供用户信息。<br />
        3.本网站保留在任何时间删除违法信息的权利，并有权追究相关责任人的法律责任。尽管我们会尽力审核内容，但我们无法对所有内容进行完全审查。因此，如果发现任何违法信息，请及时向我们举报。<br />
        我们希望通过审核机制来提高内容的质量和合法性，但并不能保证所有内容的审核都是绝对准确和完备的。用户在使用本网站时，需要理解并承担自行判断内容真实性和合法性的责任。如有任何问题或投诉，请联系官方人员。 vx:laq2215775451
      </p>
    </div>
    <div class="footbt">
      <pr-button
        class="button"
        :size="'max'"
        :nom="'secondary'"
        @click="closeModal(0)"
        >关闭</pr-button
      >
      <pr-button class="button" :size="'max'" @click="addCard">发布</pr-button>
    </div>
  </div>
</template>

<script>
import * as axios from "@/api/index";
import { cardcolor } from "@/utils/data";
import { label } from "@/utils/data";
import PrButton from "./PrButton.vue";
import { showToast } from "vant";
export default {
  data() {
    return {
      colorMessage: "rgba(252,175,162,0.9)",
      labelmessage: "寻物",
      label,
      cardcolor,
      selected: 0, //当前选择的颜色
      //文件上传的图片数组
      fileList: [],
      //标签
      labelselected: 0,
      //留言信息 存储
      message: "",
    };
  },

  computed: {
    computedname() {
      return this.$store.state.name;
    },
  },

  components: {
    PrButton,
  },
  methods: {
    beforeRead(file){
      //符合这两种情况 都取消上传 return false
       if ( ['.png', '.jpg', '.jpeg'].includes(file.name.replace(/.+\./,'.').toLowerCase()) && file.size<=2097152) {
        return  true
       
      
      }else{
        showToast({
          message: "上传格式不符合要求,支持.png, .jpg, .jpeg,并且要小于2MB",

          style: {
            backgroundColor: "transparent",
            fontWeight: "600",
          },
        });
      }

    },
    addCard() {
     
      if (!localStorage.getItem("name") || !localStorage.getItem("vuex")) {
        showToast({
          message: "登陆状态有问题，请登陆，如已经登录则退出重新登录",

          style: {
            backgroundColor: "transparent",
            fontWeight: "600",
          },
        });
      } else {
        if (this.message.length > 15) {
          let formData = new FormData();
          if (this.fileList[0]) {
            formData.set("image", this.fileList[0].file);
          }
          if (this.$store.state.school !== "主留言墙") {
            formData.set("school", this.$store.state.school);
          }
          formData.set("userid", this.$store.state.userid);
          formData.set("username", this.$refs.name.value);
          formData.set("color", this.colorMessage);
          formData.set("label", this.labelmessage);
          formData.set("message", this.message);
          axios
            .addCard(formData)
            .then((res) => {
              if (res.data.code == 200) {
            
                this.$emit("addshowCard", res.data);
                this.message = "";
                showToast({
                  message: res.data.message,
                  style: {
                    backgroundColor: "transparent",
                    fontWeight: "600",
                  },
                });
              } else {
                this.message = "";
                showToast({
                  message: res.data.message,

                  style: {
                    backgroundColor: "transparent",
                    fontWeight: "600",
                  },
                });
              }
            })
            .catch((res) => {});
        } else {
          showToast({
            message: "输入内容不能少于15字",

            style: {
              backgroundColor: "transparent",
              fontWeight: "600",
            },
          });
        }
      }
    },
    changeColor(index, e) {
      this.colorMessage = e;
      this.selected = index;
    },
    changelabel(index, data) {
      this.labelmessage = data;
      this.labelselected = index;
    },
    //关闭侧边栏
    closeModal(data) {
      this.$emit("addclose", data);
    },
  },
};
</script>

<style lang="scss" scoped>
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
    padding: 0.75rem;
    box-sizing: border-box;
    margin-bottom: 0.625rem;
    transition: all 0.5s;
    .message {
      background: none;
      border: none;
      resize: none;
      height: 11.75rem;
      width: 100%;
      font-size: 0.875rem;
      padding: 0.45rem 0;
      box-sizing: border-box;
    }

    .name {
      width: 50%;
      box-sizing: border-box;
      background: none;
      border: none;
      height: 1.55rem;
      line-height: 1.55rem;
      font-family: fa;
      font-size: 0.75rem;
    }
  }

  .labels {
    overflow: hidden;
  }
  .title {
    overflow: hidden;
    margin-top: 0;
    font-family: fa;
    color: $gray-1;
    font-weight: 600;
    padding-top: 1.875rem;
    margin-bottom: 0;
  }
  .label {
    display: flex;
    flex-wrap: wrap;

    .label-li {
      padding: 0.125rem 0.6rem 0px;
      border-radius: 1.25rem;
      margin: $padding-20 0.3125rem;
      cursor: pointer;
      transition: all 0.3s;
    }
    .labelselected {
      background: #ebeb;
      font-weight: 600;
    }
  }
  .mzsm {
    font-size: 0.75rem;
    color: $gray-3;
    padding-top: 0.325rem;
  }
  .footbt {
    padding: $padding-20;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .button {
      margin-left: 10px;
      cursor: pointer;
    }
  }
}
</style>

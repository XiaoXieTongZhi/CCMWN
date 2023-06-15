<template>
  <div class="node-card" :style="{ backgroundColor: note.color }">
    <div class="top">
      <p class="time">{{ filter(Date.parse(note.post_date)) }}</p>
      <p class="pictureshow" @click="clickbg">
        {{ !bgpicture ? "查看图片" : "查看文字" }}
      </p>
      <p class="label">{{ note.type }}</p>
    </div>
    <div class="message"
    ref="bgc"
      :style="bgpicture ? { 'background-image': `url(http://localhost:3000/uploads/img/${note.image_name})` } : ''">
      <van-text-ellipsis @click.native.stop :content="!bgpicture ? note.content : ''" expand-text="展开" collapse-text="收起"
        rows="7" />
    </div>
    <div class="foot">
      <div class="foot-left">
        <span ref="postid" style="font-size: 16px; font-weight: 200;" >{{ note.postid }}</span>
        <span  v-red-on-hover-click class="iconfont icon-favorites">{{
          note.like_count
        }}</span>
        <span v-show="hidden" v-red-on-hover class="iconfont icon-comments" @click="selectwall">{{
          note.comment_count
        }}</span>
      </div>
      <div class="name" @click="note.username !== '匿名' ? userheadclick(note.username) : null">{{ note.username }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@font-face {
  font-family: fa;
  src: url("@/assets/阿里妈妈数黑体/Alimama_ShuHeiTi_Bold.ttf");
}

.node-card {
  font-family: fa;

  min-height: 11.625rem;
  min-width: 10.25rem;
  height: 14rem;
  width: 13rem;
  background-color: rgba(252, 175, 162, 0.3);
  box-sizing: border-box;
  position: relative;
  margin-top: 1.925rem;
  margin-left: 2rem;

  .top {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 0 0.625rem;
    font-weight: 600;
    margin-bottom: 0.625rem;

    p {
      font-size: 0.75rem;
      color: $gray-2;
    }

    .pictureshow {
      cursor: pointer;
    }
  }

  .message {
    height: 7.75rem;
    color: $gray-1;
    letter-spacing: 0;
    line-height: 1.375rem;
    text-align: justify;
    padding: 0 0.75rem;
    
    background-repeat: no-repeat;
    background-position: center;
    background-size:contain;
    overflow: auto;

    font-size: 0.725rem;
  }

  .foot {
    height: 1.25rem;
    display: flex;
    justify-content: space-around;
    position: absolute;
    bottom: 0.125rem;
    left: 0;
    width: 100%;

    .name {
      cursor: pointer;
      font-weight: 600;
      font-size: 0.675rem;
      margin-right: -0.625rem;
    }

    .foot-left {
      width: 5.75rem;
      display: flex;
      align-items: center;

      span {
        margin-right: 1.25rem;
        cursor: pointer;
        font-size: 1.1rem;
        line-height: 1rem;
      }

      .iconfont {
        font-size: 0.75rem;
      }
    }
  }
}
</style>

<script>

import * as axios from "@/api/index";
import moment from "moment";
import { showToast } from "vant";
export default {
  directives: {
    "red-on-hover-click": {
      mounted(el, binding,) {
       
        el.style.transition = "color 0.8s";

        const store = binding.instance.$store;
        const thiss = binding.instance

        if ((Object.values(thiss.postid)).includes(Number(thiss.$refs.postid.textContent))) {
       
          var clicked = true;
          el.style.color = "red";
        } else {
          el.style.color = "";
          clicked = false;
        }

        el.addEventListener("click", function () {
          if (!clicked) {

            this.style.color = "red";
            clicked = true;
            store.commit('changeLike', true)
            //删除临时状态数组的内容
            thiss.postid.push(Number(thiss.$refs.postid.textContent));
            
          } else {
            let index = thiss.postid.indexOf(Number(thiss.$refs.postid.textContent));
            thiss.postid.splice(index, 1);
           this.style.color = "";
            clicked = false;
            store.commit('changeLike', false)
          }

          axios.changefeedbacks({
            userid: store.state.userid,
            postid: thiss.$refs.postid.textContent,
            like: store.state.like,
          }).then(res => {
            
            if (res.data.like) {

              thiss.note.like_count = thiss.note.like_count + 1
            } else {
              thiss.note.like_count = thiss.note.like_count - 1

            }
          }).catch(err => { })

        });
        el.addEventListener("mouseenter", function () {
          if (!clicked) {
            this.style.color = "red";
          }
        });
        el.addEventListener("mouseleave", function () {
          if (!clicked) {
            this.style.color = "";
          }
        });
      },
    },
    "red-on-hover": {
      mounted(el) {
        el.style.transition = "color 0.8s";
        el.addEventListener("mouseenter", function () {
          this.style.color = "red";
        });
        el.addEventListener("mouseleave", function () {
          this.style.color = "";
        });
      },
    },
  },
  data() {
    return {
      postid:[],
      text: this.note.message,
      //判断背景图片是否显示
      bgpicture: false,
    };
  },
  props: {
    //判断背景图片是否显示
    hidden: {
      type: Boolean,
      //默认为true显示，cardDetial传过来的false给详情卡片的里的用
      default: true,
    },
    note: {
      type: [Object, String],
      default: {},
    },
    postidp: {
      type: Array,
      default: [],
    },
   
  },

  methods: {
    userheadclick(value){
      if (localStorage.getItem('name')&&localStorage.getItem('token')) {
        this.$store.commit('changeisperson',true)
        this.$store.commit('changepersonname',value)
        axios
          .selectFollow({
            params: {
              username: value,
            },
          })
          .then((res) => {
           this.$store.commit('changeselectuserid',res.data.userid)          
          this.$store.commit('changepersonfensi',res.data.fensiId);
          this.$store.commit('changepersonguanzhu',res.data.guanzhuId);
            if (res.data.fensiId.map(res =>res.follower_id).includes(JSON.parse(localStorage.getItem('vuex')).userid)) {
              this.$store.commit('changeisguanzhu',true)
            }else{
              this.$store.commit('changeisguanzhu',false)
            }
           
            axios.selectuserall({params:{
              userid:res.data.userid
            }}).then(res =>{
              this.$store.commit('changewatchuserhead',res.data.avatar)
              this.$store.commit('changebgcpicture',res.data.background)
            }).catch(err =>{
              console.log(err);
            })
          })
          .catch((err) => {
            console.log(err);
          });
      }else{
        showToast({
              message: '请先登录才能查看信息哦',

              style: {
                backgroundColor: "transparent",
                fontWeight: "600",
              },
            });
      }
      
    },
    filter(data) {
      return moment(data).format("YYYY-MM-DD");
    },

    clickbg() {
      this.bgpicture = !this.bgpicture;
    },

    selectwall() {
      this.$emit('selectpostid', this.$refs.postid.textContent);
      //选择的postid
      this.$store.commit('updatepostid',this.$refs.postid.textContent)
      this.$emit('selected')
    }
  },
watch:{
  postidp:{
    immediate: true,
    handler(){
      this.postid = this.postidp
    }
    
  }
}

};
</script>

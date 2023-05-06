<template>
  <div class="card-detail">
    <div class="top-bt">
      <!-- <p class="revoke">联系墙主撕掉该便签</p> -->
      <p class="report" v-report>举报</p>
    </div>
    <node-card :note="card" class="nodecard" :hidden="false"></node-card>
    <div class="form">
      <textarea class="message" v-model="content" placeholder="请输入评论"></textarea>
      <div class="bt">
        <select class="name" ref="name" >
          <option  :value="computedname" class="option">{{ computedname }}</option>
          <option :value="'匿名'" class="option">匿名</option>
        </select>
        <pr-button :size="'small'" @click="addcommit">确定</pr-button>
      </div>
    </div>
    <p class="title">
      评论
      {{ card.comment_count }}
    </p>
    <div class="commont">
      <div class="commont-li" v-for="(data, index) in commont" :key="index">
        <div class="user-head" :style="{ backgroundImage: portrait[1] }"></div>
        <div class="comm-m">
          <div class="m-top">
            <p class="name">{{ data.username }}</p>
            <p class="time">{{ filter(Date.parse(data.comment_date)) }}</p>
          </div>
          <div class="content">
            {{ data.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-detail {
  overflow: hidden;

  .nodecard {
    margin-left: 1.3625rem;
  }

  .top-bt {
    height: 0px;
    padding: $padding-20;
    align-items: center;
    justify-content: space-between;
    display: flex;

    .report {
      font-size: $size-14;
      cursor: pointer;
      color: black;
    }
  }

  .form {
    margin: 0 auto;

    width: 80%;

    .message {
      background: none;
      height: 7.125rem;
      resize: none;
      padding: $padding-8;
      box-sizing: border-box;
      width: 100%;
      margin-top: 0.75rem;
    }

    .bt {
      display: flex;
      justify-content: space-between;

      .name {
        width: 50%;
        box-sizing: border-box;
        padding: $padding-8;
        border: 1px solid rgba(148, 148, 148, 1);
        line-height: 1.25rem;
        background: none;
      }
    }
  }

  .title {
    margin-left: 0.925rem;
    font-weight: 600;
    padding: 1rem 0;
  }

  .commont-li {
    border-bottom: 1px solid #ccc;
    margin-left: 0.9375rem;
    display: flex;
    padding-bottom: 1rem;

    .user-head {
      flex: none;
      border-radius: 50%;
      overflow: hidden;
      width: 1.75rem;
      height: 1.75rem;
    }

    .comm-m {
      padding: 0 $padding-8;
    }

    .m-top {
      display: flex;

      .name {
        font-weight: 600;
      }

      .time {
        font-size: $size-12;
        padding-left: $padding-4;
        color: $gray-3;
      }
    }

    .content {
     
      padding-top: $padding-4;
      word-wrap: break-word;
      width: 10.25rem;
    }
  }
}
</style>

<script>
import * as axios from "@/api/index";
import NodeCard from "./NodeCard.vue";
import PrButton from "./PrButton.vue";
// import {commont} from '../../mock/index';
import { portrait } from "@/utils/data";
import NodeCardmethods from "@/components/NodeCard.vue";
import { showToast } from "vant";
export default {
  directives: {
    report: {
      mounted(el, binding) {
        const store = binding.instance.$store;
        const thiss = binding.instance;

        thiss.vreport = Object.values(thiss.reportpostid);
        el.addEventListener("click", () => {
          if (el.textContent === "举报") {
            el.style.color = "red";
            el.textContent = "已举报";
            store.commit("changereport", true);
            thiss.vreport.push(Number(store.state.postid));
          } else {
            el.style.color = "";
            el.textContent = "举报";
            store.commit("changereport", false);
            let index = thiss.vreport.indexOf(Number(store.state.postid));
            thiss.vreport.splice(index, 1);
          }
          axios
            .changefeedbacksreport({
              userid: store.state.userid,
              postid: store.state.postid,
              report: store.state.report,
            })
            .then((res) => {
              if (res.data.report) {
                el.textContent = "已举报";
              } else {
                el.textContent = "举报";
              }
            })
            .catch((err) => { });
        });
      },
      updated(el, binding) {

        const store = binding.instance.$store;
        const thiss = binding.instance;
     
        if (thiss.vreport.includes(Number(store.state.postid))) {
          el.style.color = "red";
          el.textContent = "已举报";
        } else {
          el.style.color = "";
          el.textContent = "举报";
        }
      },
    },
  },
  data() {
    return {
      content:'',
      vreport: [],
      commont: "",
      portrait,
    };
  },
  computed: {
    computedname() {
      return this.$store.state.name;
    },
  },
  props: {
    reportpostid: {
      type: Array,
      default: [],
    },
    card: {
      type: [String, Object],
      default: {},
    },
    postid: {
      type: String,
      default: "",
    },
  },
  components: {
    NodeCard,
    PrButton,
  },
  methods: {
    filter(data) {
      return NodeCardmethods.methods.filter(data);
    },
    addcommit(){
      if (!this.content.length == 0) {
        axios.addCommit({
        postid:this.$store.state.postid,
        userid:this.$store.state.userid,
        commitcontent:this.content,
        username:this.$refs.name.value
      }).then(res =>{
        this.commont.unshift(res.data.data);
        this.content=''
        this.card.comment_count=this.card.comment_count+1

      }).catch(err =>{})
      }else{
        showToast({
              message: "不能为空",

              style: {
                backgroundColor: "transparent",
                fontWeight: "600",
              },
            });
      }
     
    }
  },
  watch: {
    postid: {
      immediate: true,
      handler(val) {
        axios
          .showComment({
            params: {
              postid: val,
            },
          })
          .then((res) => {
            this.commont = res.data.message.reverse();
          })
          .catch((res) => { });
      },
    },
  },
};
</script>

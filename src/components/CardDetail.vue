<template>
  <div class="card-detail">
    <div class="top-bt">
      <p
        class="revoke"
        @click="deleteCard(this.$refs.nodecard.$refs.postid.textContent)"
      >
        删除
      </p>
      <p class="report" v-report>举报</p>
    </div>
    <node-card
      ref="nodecard"
      :note="card"
      class="nodecard"
      :hidden="false"
    ></node-card>
    <div class="form">
      <textarea
        class="message"
        v-model="content"
        placeholder="请输入评论"
      ></textarea>
      <div class="bt">
        <select class="name" ref="name">
          <option :value="computedname" class="option">
            {{ computedname }}
          </option>
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
        <div
          class="user-head"
          :style="{
            'background-image': `url(http://localhost:3000/uploads/userimg/${
              data.username == '匿名' ? '默认.png' : data.avatar
            })`,
          }"
        ></div>
        <div class="comm-m">
          <div class="m-top">
            <p class="name"   @click="data.username !== '匿名' ? userheadclick(data.username) : null">
              
              {{
                data.username == $refs.nodecard.$refs.username.innerText &&$refs.nodecard.$refs.username.innerText!== '匿名'
                  ? data.username + "&emsp;" + "帖主"
                  : data.username
              }}
            </p>
            <p class="time">{{ filter(Date.parse(data.comment_date)) }}</p>
            <p
              class="delete"
              v-show="
                ($refs.nodecard.$refs.username.textContent ===
                $store.state.username
                  ? true
                  : false) ||
                ($store.state.userlevel !== 'Level3' ? true : false)||
                ($store.state.userid==data.userid ?true:false)
              " 
              @click="
                deletecomment([
                  data.commentid,
                  data.userid,
                  $store.state.userid,
                ])
              "
            >
              删除 {{}}
            </p>
          </div>
          <div class="content">
            <van-text-ellipsis
              @click.native.stop
              :content="data.content"
              expand-text="展开"
              collapse-text="收起"
              rows="5"
            />
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
    .revoke {
      font-size: $size-14;
      color: red;
      cursor: pointer;
    }
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
      height: 2.3rem;
      background-position: center;
      background-size: cover;
    }

    .comm-m {
      padding: 0 $padding-8;
    }

    .m-top {
      display: flex;
      justify-content: space-between;
      .name {
        font-weight: 600;
        cursor: pointer;
      }
      .delete {
        color: red;
        cursor: pointer;
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
// import { portrait } from "@/utils/data";
import NodeCardmethods from "@/components/NodeCard.vue";
import { showToast } from "vant";
export default {
  directives: {
    report: {
      mounted(el, binding) {
        const store = binding.instance.$store;
        const thiss = binding.instance;
        thiss.vreport = Object.values(thiss.reportpostid);
        if (thiss.vreport.includes(Number(store.state.postid))) {
          el.style.color = "red";
          el.textContent = "已举报";
        } else {
          el.style.color = "";
          el.textContent = "举报";
        }
        el.addEventListener("click", () => {
          if (localStorage.getItem("name") && localStorage.getItem("token")) {
            if (el.textContent === "举报") {
              el.style.color = "red";
              el.textContent = "已举报";
              store.commit("changereport", true);
              thiss.vreport.push(Number(store.state.postid));
              thiss.reportpostid.push(Number(store.state.postid));
            } else {
              el.style.color = "";
              el.textContent = "举报";
              store.commit("changereport", false);
              let index = thiss.vreport.indexOf(Number(store.state.postid));
              thiss.vreport.splice(index, 1);
              let index2 = thiss.reportpostid.indexOf(
                Number(store.state.postid)
              );
              thiss.reportpostid.splice(index2, 1);
            }
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
            .catch((err) => {});
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
      content: "",
      vreport: [],
      commont: "",
    };
  },
  computed: {
    computedname() {
      return this.$store.state.username;
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
  mounted() {},
  methods: {
    userheadclick(value) {
      if (localStorage.getItem("name") && localStorage.getItem("token")) {
        this.$store.commit("changeisperson", true);
        this.$store.commit("changepersonname", value);
        axios
          .selectFollow({
            params: {
              username: value,
            },
          })
          .then((res) => {
            this.$store.commit("changeselectuserid", res.data.userid);
            this.$store.commit("changepersonfensi", res.data.fensiId);
            this.$store.commit("changepersonguanzhu", res.data.guanzhuId);
            if (
              res.data.fensiId
                .map((res) => res.follower_id)
                .includes(JSON.parse(localStorage.getItem("vuex")).userid)
            ) {
              this.$store.commit("changeisguanzhu", true);
            } else {
              this.$store.commit("changeisguanzhu", false);
            }

            axios
              .selectuserall({
                params: {
                  userid: res.data.userid,
                },
              })
              .then((res) => {
                this.$store.commit("changewatchuserhead", res.data.avatar);
                this.$store.commit("changebgcpicture", res.data.background);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        showToast({
          message: "请先登录才能查看信息哦",

          style: {
            backgroundColor: "transparent",
            fontWeight: "600",
          },
        });
      }
    },
    deletecomment(value) {
      axios
        .deletecomment({
          params: {
            commentid: value[0],

            commentuserid: value[1],
            //登录账号的用户id
            userid: value[2],
          },
        })
        .then((res) => {
          if (res.data.code == 200) {
            const index = this.commont.findIndex(
              (item) => item.commentid == value[0]
            );

            if (index !== -1) {
              this.commont.splice(index, 1);
              this.card.comment_count = this.card.comment_count - 1;
              showToast({
              message: '删除成功',

              style: {
                backgroundColor: "transparent",
                fontWeight: "600",
              },
            });
            }
          } else {
            showToast({
              message: res.data.message,

              style: {
                backgroundColor: "transparent",
                fontWeight: "600",
              },
            });
          }
        })
        .catch((err) => {});
    },
    deleteCard(postid) {
      axios
        .deleteCard({
          postid: postid,
          userid: this.$store.state.userid,
        })
        .then((result) => {
          if (result.data.code == 300) {
            showToast({
              message: result.data.message,

              style: {
                backgroundColor: "transparent",
                fontWeight: "600",
              },
            });
          } else {
            this.$emit("closecarddetail");
            showToast({
              message: result.data.message,

              style: {
                backgroundColor: "transparent",
                fontWeight: "600",
              },
            });
            this.$emit("deleteCard", postid);
          }
        })
        .catch((err) => {});
    },
    filter(data) {
      return NodeCardmethods.methods.filter(data);
    },
    addcommit() {
      console.log(this.$store.state.selectuserid);
      if (!this.content.length == 0) {
        if (this.content.length < 300) {
          axios
            .addCommit({
              postid: this.$store.state.postid,
              userid: this.$store.state.userid,
              commitcontent: this.content,
              username: this.$refs.name.value,
              useredid: this.$store.state.selectuserid,
            })
            .then((res) => {
              if (res.data.code == 200) {
                showToast({
                  message:'评论发布成功',
                  style: {
                    backgroundColor: "transparent",
                    fontWeight: "600",
                  },
                });
                this.commont.unshift(res.data.data);
                this.content = "";
                this.card.comment_count = this.card.comment_count + 1;
              } else {
                showToast({
                  message: res.data.data,

                  style: {
                    backgroundColor: "transparent",
                    fontWeight: "600",
                  },
                });
              }
            })
            .catch((err) => {});
        } else {
          showToast({
            message: "最多评论300个字",

            style: {
              backgroundColor: "transparent",
              fontWeight: "600",
            },
          });
        }
      } else {
        showToast({
          message: "不能为空",

          style: {
            backgroundColor: "transparent",
            fontWeight: "600",
          },
        });
      }
    },
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
          .catch((res) => {});
      },
    },
  },
};
</script>

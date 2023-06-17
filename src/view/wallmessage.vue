<template>
  <div class="wall-message">
    <p class="title">
      {{ $store.state.school }}
    </p>

    <div class="school">
      <school-select></school-select>
    </div>
    <p class="slogan">
      {{ wallType.slogan }}
    </p>
    <div class="label">
      <p
        class="label-list"
        :class="{ lbselected: nlabel == -1 }"
        @click="selectNode(-1)"
      >
        全部
      </p>
      <p
        class="label-list"
        :class="{ lbselected: nlabel == index }"
        @click="selectNode(index, item)"
        v-for="(item, index) in label"
        :key="index"
      >
        {{ item }}
      </p>
    </div>

    <div class="card">
      <node-card
        v-for="(data, index) in note"
        :key="data.postid"
        :note="data"
        class="card-children"
        :class="{ cardselected: index == cardselected }"
        @selected="selectedcard(index)"
        @selectpostid="selectid"
        :postidp="redpostid"
      ></node-card>
    </div>
    <div class="pagination">
      <van-pagination
        v-model="currentPage"
        :total-items="total"
        :show-page-size="9"
        :page-count="total % 9 !== 0 ? Math.floor(total / 9) + 1 : total / 9"
        force-ellipses
      />
    </div>

    <div
      class="add"
      :style="{ bottom: addBottom + 'px' }"
      @click="CardDetails"
      v-show="!modal"
    >
      <span class="iconfont icon-add"></span>
    </div>
    <modal :title="title" @close="changeModal($event)" :isModal="modal">
      <person-info v-if="$store.state.isperson"> </person-info>
      <!-- -1说明没选中卡片 -->
      <new-card
        @addclose="changeModal"
        @addshowCard="addshowCard"
        v-else-if="cardselected == -1"
      ></new-card>

      <card-detail
        v-else
        :card="note[cardselected]"
        :postid="postid"
        :reportpostid="reportpostid"
        @deleteCard="deleteCard"
        @closecarddetail="closecarddetail"
      ></card-detail>
    </modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import * as axios from "@/api/index";
import "@/assets/iconfont/iconfont.css";
import { wallType, label } from "@/utils/data";
import NodeCard from "@/components/NodeCard.vue";
import NewCard from "@/components/NewCard.vue";
import SchoolSelect from "@/components/SchoolSelect.vue";
import CardDetail from "@/components/CardDetail.vue";
import personInfo from "@/components/personInfo/person.vue";
import { showToast } from "vant";
export default {
  components: {
    NodeCard,
    Modal,
    NewCard,
    SchoolSelect,
    CardDetail,
    personInfo,
  },
  data() {
    return {
      total: 0,
      tempnote: [],
      currentPage: 1,
      reportpostid: [],
      redpostid: [],
      postid: 0,
      title: "写下你的留言",
      wallType,
      label,
      nlabel: -1,
      note: "",
      addBottom: 30, //按钮上下效果
      modal: true,
      cardselected: -1, //当前选择的卡片
    };
  },
  watch: {
    currentPage(newval) {
      let start = (newval - 1) * 9;
      let end = newval * 9;
      this.note = this.tempnote.slice(start, end);
    },
    inputselectvalue(newvalue) {
      this.note = newvalue;
    },
    "$store.state.isperson"(newVal) {
      if (newVal) {
        // 在这里更新数据状态
        this.title = "用户信息";
        this.cardselected = -1;
        this.modal = true;
      }
    },
  },
  mounted() {

    //判断用户对哪些点了喜欢
    axios
      .userlike({
        params: {
          userid: this.$store.state.userid,
          like: true,
          data: "default",
        },
      })
      .then((res) => {
        this.redpostid = res.data.postid;
   
      })
      .catch((err) => {});
    //判断用户对哪些点了举报
    axios
      .userreport({
        params: {
          userid: this.$store.state.userid,
          report: true,
          data: "default",
        },
      })
      .then((res) => {
        this.reportpostid = res.data.postid;
      })
      .catch((err) => {});

    //获取后台默认已有的内容数据
    axios
      .showCard({
        params: {
          //barch留言墙种类分支
          branch: this.$store.state.school,
          //请求默认数据的时候可以绕过jwt
          data: "default",
        },
      })
      .then((res) => {
        //在vuex 存一个所有postid的数组
        let postarray = res.data.data.map((res) => res.postid);
        this.$store.commit("allpostid", postarray);
        this.tempnote = res.data.data.reverse();

        this.total = this.tempnote.length;
        let start = (this.currentPage - 1) * 9;
        let end = this.currentPage * 9;

        this.note = this.tempnote.slice(start, end);
      })
      .catch((res) => {});

    window.addEventListener("scroll", this.scrollBottom);
  },
 
  unmounted() {
    window.addEventListener("scroll", this.scrollBottom);
  },
  computed: {
    inputselectvalue() {
      return this.$store.state.inputselectvalue;
    },
  },
  methods: {
    closecarddetail() {
      this.$store.commit("changeisperson", false);
      this.cardselected = -1;
      this.modal = false;
    },

    deleteCard(postid) {
      let index = this.tempnote.findIndex((note) => note.postid == postid);
      this.tempnote.splice(index, 1);
      this.currentPagemethod();
    },
    currentPagemethod() {
      let start = (this.currentPage - 1) * 9;
      let end = this.currentPage * 9;
      this.note = this.tempnote.slice(start, end);
    },
    selectid(value) {
      this.postid = value;
    },
    CardDetails() {
      this.title = "写下你的留言";
      this.changeModal();
    },
    addshowCard(data) {
      this.tempnote.unshift(data);
      this.total = this.tempnote.length;
      if (this.currentPage == 1) {
        this.currentPagemethod();
      }
      this.currentPage = 1;
    },
    selectNode(e, item) {
      axios
        .showCard({
          params: {
            branch: this.$store.state.school,
            type: item,
            data: "default",
          },
        })
        .then((res) => {
          this.tempnote = res.data.data.reverse();

          this.total = this.tempnote.length;
          let start = (this.currentPage - 1) * 9;
          let end = this.currentPage * 9;

          this.note = this.tempnote.slice(start, end);
        })
        .catch((res) => {});
      this.nlabel = e;
    },
    scrollBottom() {
      //距离顶部高度
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      //可见内容高度
      let clientHeight = document.documentElement.clientHeight;
      //整个内容高度
      let scrollHeight = document.documentElement.scrollHeight;
      if (scrollTop + clientHeight + 200 >= scrollHeight) {
        if (document.documentElement.clientWidth > 940) {
          this.addBottom = scrollTop + clientHeight + 300 - scrollHeight;
        } else {
          this.addBottom = scrollTop + clientHeight + 200 - scrollHeight;
        }
      } else {
        this.addBottom = 30;
      }
    },
    //切换侧边栏
    changeModal() {
      this.$store.commit("changeisperson", false);
      this.cardselected = -1;
      this.modal = !this.modal;
    },
    //切换选择的卡片
    selectedcard(data) {
      this.title = "卡片详情";
      if (data != this.cardselected) {
        this.$store.commit("changeisperson", false);
        this.cardselected = data;
        this.modal = true;
      } else {
        this.$store.commit("changeisperson", false);
        this.cardselected = -1;
        this.modal = false;
      }
      setTimeout(() => {
        if (
          !localStorage.getItem("name") ||
          !localStorage.getItem("vuex") ||
          this.$store.state.isModal
        ) {
          this.$store.commit("changeisperson", false);
          this.cardselected = -1;
          this.modal = false;
          showToast({
            message: "登陆状态有问题，请登陆，如已经登录则退出重新登录",

            style: {
              backgroundColor: "transparent",
              fontWeight: "600",
            },
          });
        }
      }, 500);
    },
  },
};
// console.log(label);
</script>
<style lang="scss" scoped>
::v-deep .van-pagination__item {
  background-color: transparent;
}

.wall-message {
  box-sizing: border-box;
  min-height: 700px;
  padding-top: 4.125rem;
  overflow: hidden;
  padding-bottom: 0.5rem;
  .pagination {
    margin: 0 auto;
    width: 12.5rem;
    margin-top: 2.5rem;
  }
  .title {
    font-size: 3.5rem;
    color: $gray-1;
    text-align: center;
    font-weight: 600;
    padding-top: 1rem;
    padding-bottom: $padding-8;
  }

  .slogan {
    font-size: 1.1rem;
    color: $gray-2;
    text-align: center;
  }

  .label {
    font-size: 0.7125rem;
    display: flex;
    justify-content: center;
    margin-top: 2.5rem;

    .label-list {
      cursor: pointer;
      padding: 0 14px;
      line-height: 1.75rem;
      margin: $padding-4;
      color: $gray-2;
      box-sizing: border-box;
    }

    .lbselected {
      color: $gray-1;
      font-weight: 600;
      border: 1px solid $gray-1;
      border-radius: 14px;
    }
  }

  .card {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    .cardselected {
      border: 1px solid black;
    }
  }

  .add {
    width: 3.5rem;
    height: 3.5rem;
    background-color: $gray-1;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
    border-radius: 50%;
    position: fixed;
    right: 1.875rem;
    transition: all 1.5s;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 30;

    .icon-add {
      color: $gray-10;
      font-size: 1.5rem;
    }
  }
}
</style>

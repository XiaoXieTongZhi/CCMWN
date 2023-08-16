<template>
   <div class="body">
    <ul ref="fansList">
      <li v-for="(data, index) in data" :key="index">
        <div>
          <div
            class="user-head"
            :style="{
              'background-image': `url(${baseImgPath}/uploads/userimg/${
                data.username !== '匿名' ? data.avatar : '默认.png'
              })`,
            }"
          ></div>
          <span
            >{{ data.username }} 对你{{ data.postid }}进行了关注
          </span>
          <span>{{ new Date(data.created_at).toLocaleString() }}</span>
        </div>

        <button type="button" @click="deletefansmessage(data.id)">
          删除
        </button>
      </li>
    </ul>
  </div>
</template>


<style lang="scss" scoped>
    
.body {
  overflow: hidden;
  > button {
    display: block;
    height: 50px;
    width: 100%;
    margin: 0 auto;
    background-color: rgb(216, 219, 199);
    cursor: pointer;
    border: none;
    font-weight: bolder;
    font-size: 20px;
    border-bottom: 1px slategrey solid;
    transition: background-color 0.3s ease;
  }
  > button:hover {
    background-color: beige;
  }
  ul {
    list-style: none;
    li {
      padding: 10px;
      font-weight: 500;
      border-bottom: 1px solid black;
      display: flex;
      justify-content: space-between;
      align-items: center;
      > div {
        width: 80%;
        span{

          margin: 0px 7px;
          height: 10px;
          font-weight: 400;

        }
        >div{
          display: inline-block;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-size: cover;
          background-position: center;
        }
      }
      button {
        height: 50px;
        width: 50px;
        background-color: rgba(58, 58, 56, 0.788);
        border: none;
        border-radius: 50%;
        transition: background-color 0.3s ease;
        color: white;
        cursor: pointer;
      }
      button:hover {
        background-color: #e0e0e0;
        border: 1px solid rgb(235, 151, 25);
        color: black;
      }
      p {
        font-weight: bold;
      }
    }
  }
}
</style>




<script >
import { baseImgPath } from "@/utils/env";
import * as axios from "@/api/index";
export default {

    data(){
      return {
        data:[],
        baseImgPath
      }
    },
 mounted(){
  axios
      .fansmessage({
        userid: this.$store.state.userid,
      })
      .then((res) => {
        if (res.data.code == 200) {
      this.data = res.data.message
      this.$store.commit('changefanscount',this.data.length)
        }
      })
      .catch((err) => {});
 },
    methods:{
      deletefansmessage(value){
        axios.deletefansmessage({id:value}).then((res) => {
          if (res.data.code == 200) {
            let index =this.data.findIndex(data => data.id == value)
            this.data.splice(index,1)
          }
        }).catch((err) => {});
      }


    }





}


</script>
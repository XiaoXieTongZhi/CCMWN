<template>
   <div class="body">
    <ul ref="SystemList">
      <li v-for="(data, index) in data" :key="index">
        <div>
          <span
            >{{ data.message_content }}
          </span>
          <span>{{ new Date(data.creation_date).toLocaleString() }}</span>
        </div>

        <button type="button" @click="deletesystemmessage(data.message_id)">
          删除
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import * as axios from "@/api/index";

export default {
     data () {
       return {
        data:[]
       }
     },
   
     mounted(){
      axios
      .systemmessage({
        userid: this.$store.state.userid,
      })
      .then((res) => {
        if (res.data.code == 200) {
        
          this.data = res.data.data;
      
          this.$store.commit('changesystemcount',this.data.length)

          
        }
      })
      .catch((err) => {});


     },
     methods:{
      deletesystemmessage(value){
       axios.deletesystemmessage({message_id:value}).then((res) => {
        if (res.data.code == 200) {
          let index =this.data.findIndex(data => data.message_id == value)
            this.data.splice(index,1)
            this.$store.commit('changesystemcount',this.data.length)
        }
       }).catch (err => {});
      }
  }



    }

</script>



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
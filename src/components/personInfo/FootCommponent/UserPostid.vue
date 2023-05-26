<template>
    <div class="body">
      <ul class="post-list">
        <span class="main">主留言墙</span>
        <li title="类型——ID" :style="{backgroundColor:data.color}" v-for="data in posts" :key="data" class="post-item">
          {{ data.type }}{{ data.postid }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      posts() {
        return this.$store.state.personMessage.posts
      },
     
    },
  }
  </script>
  
  <style lang="scss" scoped>
  .body {
    display: flex;
    justify-content:flex-start;
    overflow: hidden;
    
    .main{
    display: block;
    width: 15.625rem;
      text-align: center;
      font-size: 1.05rem;
      font-weight: 600;
    }
  }
  
  .post-list {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .post-item {
 
    width: calc(25% - 19px);
    margin: 10px;
    padding: 10px;
    background-color: #f7f7f7;
    border-radius: 4px;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
    cursor: pointer;
  }
  
.post-item:hover {
    background-color: #e0e0e0 !important;

  }
  </style>
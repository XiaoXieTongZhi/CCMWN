<template>
    <div class="body">
      <ul class="post-list">
        <li title="点击查看详情" :style="{backgroundColor:data.color}" v-for="data in posts" :key="data" class="post-item">
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
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
    cursor: pointer;
  }
  
  .post-item:hover {
    background-color: skyblue;
  }
  </style>
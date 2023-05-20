<template>
    <div class="body">
      <ul class="post-list">
        <li v-for="data in posts" :key="data" class="post-item">
          {{ data }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      posts() {
        return this.$store.state.personMessage.posts.map((res) => `${res.type} — ${res.postid}`);
      },
    },
  }
  </script>
  
  <style lang="scss" scoped>
  .body {
    display: flex;
    justify-content: center;
  }
  
  .post-list {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .post-item {
    width: calc(25% - 20px);
    margin: 10px;
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
    cursor: pointer;
  }
  
  .post-item:hover {
    background-color: #ebebeb;
  }
  </style>
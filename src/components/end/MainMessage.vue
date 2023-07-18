<template>
  <el-table highlight-current-row :data="filterTableData" style="width: 100%"  @row-click="handleColumnClick"
    :default-sort="{ prop: 'date', order: 'descending' }">

    <!-- 错误出现在此处 -->
    <el-table-column v-for="(value, key, index) in formmessage[0]" :label="key" :prop="key" :key="key" :sortable="index === 0"  
      width="180">
    
    </el-table-column>

    <!-- <el-table-column prop="postid" label="postid" width="180"></el-table-column>
    <el-table-column prop="userid" label="userid" width="180"></el-table-column>
    <el-table-column prop="username" label="username" width="180"></el-table-column>
    <el-table-column prop="type" label="type" width="180"></el-table-column>
    <el-table-column prop="color" label="color" width="180"></el-table-column>
    <el-table-column prop="content" label="content" width="180"></el-table-column>
    <el-table-column prop="image_name" label="image_name" width="180"></el-table-column>
    <el-table-column prop="image_path" label="image_path" width="180"></el-table-column> -->

    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="scss" scoped></style>
<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      search: "",
    };
  },
  computed: {
    ...mapState(['formmessage']),
    filterTableData() {
      return this.formmessage.filter((data) => {
        return (
          !this.search ||
          JSON.stringify(data).includes(this.search)
        );
      });
    },
  },

  methods: {
    handleColumnClick($event){
       this.$store.commit('setrowmessage',$event)
      
    },
    formatter(row, column) {
      return row.address;
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>

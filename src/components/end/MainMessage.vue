<template>
  <div>
    <el-input
      v-model="search"
      size="large"
      placeholder="search"
      @focus="filterfalsecolum = false"
    />
    <el-badge :value="filterfalselength" :max="99" class="item">
      <el-button size="small" @click="filterfalsecolum = true"
        >筛选待审核内容</el-button
      >
    </el-badge>
    <el-table
      highlight-current-row
      :data="!filterfalsecolum ? filterTableData : filterfalse"
      style="width: 100%"
      @row-click="handleColumnClick"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column
        v-for="(value, key, index) in formmessage[0]"
        :label="key"
        :prop="key"
        :key="key"
        sortable
     
        width="180"
      >
      
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      search: "",
      filterfalsecolum: false,
    };
  },
  computed: {
    ...mapState(["formmessage", "form"]),
    filterTableData() {
      return this.formmessage.filter((data) => {
        return !this.search || JSON.stringify(data).includes(this.search);
      });
    },
    filterfalse() {
      return this.formmessage.filter((data) => {
        return this.filterfalsecolum
          ? this.form == "users"
            ? !(
                data.avatar_username &&
                data.avatar_reviewed &&
                data.background_reviewed &&
                data.bio_reviewed
              )
            : this.form == "posts"
            ? !data.is_approved
            : this.form == "comments"
            ? !data.is_retrieved
            : false
          : false;
      });
    },
    filterfalselength() {
      return this.formmessage.filter((data) => {
        return this.form == "users"
          ? !(
              data.avatar_username &&
              data.avatar_reviewed &&
              data.background_reviewed &&
              data.bio_reviewed
            )
          : this.form == "posts"
          ? !data.is_approved
          : this.form == "comments"
          ? !data.is_retrieved
          : false;
      }).length;
    },
  },

  methods: {
    handleColumnClick($event) {
      this.$store.commit("setrowmessage", $event);
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

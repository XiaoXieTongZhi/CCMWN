<template>
  <div class="school">
    <div class="select-container">
      <input
        class="input"
        type="text"
        v-model="inputText"
        @input="handleInput"
        @blur="toggleDropdown(false)"
        placeholder="搜索学校留言墙..."
      />
      <div class="dropdown" v-show="showDropdown">
        <div
          class="option"
          v-for="school in filteredSchools"
          :key="school.id"
          @mousedown.prevent
          @click="selectSchool(school)"
        >
          {{ school }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import school from '@/utils/school.json';
const newschool = school.school.map(item => item.name);
export default {
  data() {
    return {
      inputText: '',
      selectedSchool: '',
      schools: newschool,
      showDropdown: false
    }
  },
  computed: {
    searchText() {
      return this.inputText;
    },
    filteredSchools() {
      let result = ['主留言墙'];
      if (this.searchText) {
        result = result.concat(this.schools.filter(school => school.includes(this.searchText) && school !== '主留言墙'));
      } else {
        result = result.concat(this.schools.filter(school => school !== '主留言墙'));
      }
      return result;
    }
  },
  methods: {
    handleInput() {
      if (this.inputText !== this.selectedSchool) {
        this.selectedSchool = '';
      }
      this.toggleDropdown(true);
    },
    toggleDropdown(show) {
      this.showDropdown = show;
    },
    selectSchool(school) {
      this.selectedSchool = school;
      this.showDropdown = false;
      this.$store.commit('changeSchool', school);
      this.inputText = '';
      this.$router.go(0)
    }
  }
}
</script>
  <style lang="scss" scoped>
  .option.disabled {
  color: #ccc;
}
  .school {
    width: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
    margin-left: 3.125rem;
    font-weight: 600;
    font-size: 1.125rem;
  }
  .select-container {
    position: relative;
    height: 1.5rem;
    .input{
        background: none;
        height: 100%;
        border: none;
    }
  }
  .dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 99;
  }
  .option {
    padding: 0.5rem;
    background-color: white;
  }
  .option:hover {
    background-color: #eee;
    border-bottom: 1px solid black;
  }
  </style>
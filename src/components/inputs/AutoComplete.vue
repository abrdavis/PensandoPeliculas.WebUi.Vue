<script setup>


</script>

<template>
    <div>
      <input type="text" v-model="displayValue" @input="handleInput" @focus="showDropdown = true" @blur="hideDropdown" />
      <ul v-if="showDropdown && filteredOptions.length > 0">
        <li v-for="(option, index) in filteredOptions" :key = "index" @click="selectOption(option)">{{ option[this.inputKey] }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AutoCompleteInput',
    data() {
      return {
        filteredOptions: [],
        showDropdown: false,
        selectedOption: null,
        displayValue: ''
      };
    },
    props: {
        inputData : Array,
        inputKey: String,
        inputValue: String,
        allowNewValues: Boolean
    },
    methods: {
      handleInput(event) {
        this.selectedOption = null;
        const matchingResults = this.inputData.filter(data => data[this.inputKey].toLowerCase().includes(event.target.value.toLowerCase()))
        this.filteredOptions = matchingResults;
      },
      selectOption(option) {
        this.selectedOption = option;
        this.displayValue = option[this.inputKey]
        this.showDropdown = false;
        this.$emit('autoCompleteSelect', option)
      },
      hideDropdown() {
          setTimeout(() => {
              this.showDropdown = false;
              if(!this.selectedOption && this.allowNewValues && this.displayValue){
                this.$emit('autoCompleteSelect', {genreId: null, genreName: this.displayValue});
              }
              else if(!this.allowNewValues && !this.selectedOption){
                this.displayValue = '';
              }
              
          }, 200); // Small delay to allow click event to fire
      }
    },
  };
  </script>
  
  <style scoped>
  input {
    width: 200px;
    padding: 8px;
    border: 1px solid #ccc;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    border: 1px solid #ccc;
    width: 200px;
  }
  
  li {
    padding: 8px;
    cursor: pointer;
  }
  
  li:hover {
    background-color: #f0f0f0;
  }
  </style>
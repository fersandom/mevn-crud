<template>
  <div class="form-container">
    <input type="text" class="form" v-model="itemName" placeholder="New item" />
    <button class="add-button" @click="addItem"
    >Add</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
    return {
      items: [],
      itemName: "",
    };
  },

  methods: {
      async addItem(){
          const response = await axios.post("api/itemslist/",{
              itemName: this.itemName,
          });
          this.items.push(response.data);
          this.itemName=""
      }
  },
};
</script>

<style>
</style>
<template>
  <test-header></test-header>

<div class="form-container">
    <input class="add-input" type="text" v-model="itemName" placeholder="New item" />
    <button class="add-button" @click="addItem"
    >Add</button>
  </div>

  <div class="list-container">
    <!--The list renderer-->
    <div class="list-renderer" v-for="(item, i) in items" :key="item._id">
      <input 
      v-if="isSelected(item)"
      v-model="editedItemName"
      :placeholder="[[item.itemName]]"
      />
      <p v-else>
        {{ i + 1 }} <span>{{ item.itemName }}</span>
      </p>
      <div class="icons">
        <i @click="isSelected(item) ? unselect() : select(item)" class="icon material-icons">{{isSelected(item) ? "close" : "edit"}} </i>
        <i @click="isSelected(item) ? updateItem(item, i) : removeItem(item, i)" class="icon material-icons"> {{isSelected(item) ? "save" : "delete"}} </i>
      </div>
    </div><!--end of The list renderer-->
  </div>
</template>

<script>
import Header from "./components/header";
import axios from "axios";

export default {
  name: "App",

  components: {
    "test-header": Header,
  },
  data() {
    return {
      items: [],
      itemName: "",
      editedItemName: "",
      selectedItem:{}
    };
  },
  async mounted() {
    const response = await axios.get("api/itemsList");
    this.items = response.data;
  },
  methods: {
    async removeItem(item, i) {
      await axios.delete("api/itemsList/" + item._id);
      this.items.splice(i, 1);
    },
    async addItem(){
          const response = await axios.post("api/itemslist/",{
              itemName: this.itemName,
          });
          this.items.push(response.data);
          this.itemName=""
      },
    select(item){
      this.selectedItem = item;
      this.editedItem = item.itemName
    },
    isSelected(item){
      return item._id === this.selectedItem._id;
    },
    unselect(){
      this.selectedItem={};
      this.editedItemName="";
    },
    async updateItem(item, i){
      const response = await axios.put("api/itemslist/" + item._id, {
        itemName: this.editedItemName
      });
      this.items[i] = response.data;
      this.unselect();
    }
  },
};
</script>

<style lang="sass">
</style>

const { Schema, model } = require("mongoose");
const uniqId = require("uniqid");

const crud_data = new Schema({
  itemName: {
    type: String,
    required: true,
  },

  itemId: {
      type: String,
      default: uniqId(),
      required: true
  },

  itemDate: {
      type: Date,
      default: Date.now,
      required: true
  }

});

const item = model("item", crud_data);
module.exports = item;

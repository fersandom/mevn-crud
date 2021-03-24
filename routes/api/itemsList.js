const { Router } = require("express");
const item = require("../../models/items.js");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const getItems = await item.find({});
    if (!getItems) throw new Error("Error");
    res.status(200).json(getItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const newItem = new item(req.body);
  try {
    const postItem = await newItem.save();
    if (!postItem) throw new Error("Error");
    res.status(200).json(postItem);
  } catch (error) {
    res.status(500).json({ message: error.error });
  }
});

router.put("/:id", async(req, res) => {
  const{id} = req.params;

  try{
    const putItem = await item.findByIdAndUpdate(id,req.body);
    if(!putItem) throw Error("Error");
    const updated = { ...putItem._doc, ...req.body};
    res.status(200).json(updated);
  } catch(error) {
    res.status(500).json({message:error.message});
  }
});

router.delete("/:id", async(req,res) =>{
  const {id} = req.params;
  try{
    const deleteItem = await item.findByIdAndRemove(id);
    if(!deleteItem) throw Error("Error");
    res.status(200).json(deleteItem);
  } catch(error){
    res.status(500).json({message:error.message});
  }
});

module.exports = router;
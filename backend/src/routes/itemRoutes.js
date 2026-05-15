const express = require("express")

const router = express.Router()

const {
    createItem,
    getItems,
    deleteItem,
    resolveItem
} = require("../controllers/itemController")

router.post("/", createItem)

router.get("/", getItems)

router.delete("/:id", deleteItem)

router.put("/resolve/:id", resolveItem)

module.exports = router
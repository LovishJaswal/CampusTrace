const Item = require("../models/Item")

const createItem = async (req, res) => {

    try {

        const newItem = await Item.create(req.body)

        res.status(201).json(newItem)

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        })
    }
}

const getItems = async (req, res) => {

    try {

        const items = await Item.find().sort({ createdAt: -1 })

        res.status(200).json(items)

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        })
    }
}

const deleteItem = async (req, res) => {

    try {

        await Item.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message: "Item deleted successfully"
        })
    }

    catch (error) {

        res.status(500).json({
            message: error.message
        })
    }
}

const resolveItem = async (req, res) => {

    try {

        const item = await Item.findById(req.params.id)

        item.status = "resolved"

        await item.save()

        res.status(200).json({
            message: "Item resolved"
        })
    }

    catch (error) {

        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    createItem,
    getItems,
    deleteItem,
    resolveItem
}
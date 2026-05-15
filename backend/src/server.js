const itemRoutes = require("./routes/itemRoutes")
const authRoutes = require("./routes/authRoutes")
const connectDB = require("./config/db")
const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()

connectDB()

app.use(cors())
app.use(express.json())
app.use("/api/items", itemRoutes)
app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
    res.send("CampusTrace API Running")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
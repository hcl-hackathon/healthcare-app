const express = require('express')
const configureDB = require('./config/database')
const router = require('./config/routes')
const app = express()
const port = process.env.PORT || 3035

app.use(express.json())
app.use(router)

configureDB()  // connect to DB

app.get("/health", (req, res) => {
    res.status(200).json({
        "health": "OK"
    })
});

app.listen(port, () => {
    console.log(`server running on port:${port}`)
})


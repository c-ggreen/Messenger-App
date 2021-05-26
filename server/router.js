// This is the router to enable real-time messaging

// Getting express so that I may write code in node
const express = require('express')
// Setting a router variable equal to the router object that handles requests in the program
const router = express.Router()

// The get request that retrieves data from the server
router.get('/', (req, res) => {
    res.send('server is running')
})

// Exporting the router
module.exports = router
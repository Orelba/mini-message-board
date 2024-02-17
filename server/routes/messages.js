const express = require('express')
const router = express.Router()

const messageController = require('../controllers/messageController')

// Get messages
router.get('/', messageController.message_list_get)

// Add new message
router.post('/new', messageController.message_new_post)

module.exports = router

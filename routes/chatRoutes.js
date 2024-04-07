const express = require('express')

const router = express.Router()

const { chatAi } = require('../controllers/chatController')

router.post('/chat', chatAi)

module.exports = router

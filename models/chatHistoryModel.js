const mongoose = require('mongoose')

const Schema = mongoose.Schema

const chatHistorySchema = new Schema(
  {
    user: {
      type: String,
      required: [true, "User's name is required"],
    },
    message: {
      type: Object,
      required: [true, 'Message is required'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('ChatHistory', chatHistorySchema)

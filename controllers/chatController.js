const ChatHistory = require('../models/chatHistoryModel')
const OpenAI = require('openai')
const fs = require('fs')
const path = require('path')

if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.trim() === '') {
  throw new Error(
    "The OPENAI_API_KEY environment variable is missing or empty; either provide it, or instantiate the OpenAI client with an apiKey option, like new OpenAI({ apiKey: 'My API Key' })."
  )
}

const openai = new OpenAI(process.env.OPENAI_API_KEY)
const speechFile = path.resolve('./speech.mp3')

const chatAi = async (req, res) => {
  const { message, audioModel } = req.body
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: message },
      ],
      model: 'gpt-3.5-turbo',
    })

    if (completion) {
      const userMessageHistory = new ChatHistory({
        user: 'test user',
        message: { role: 'user', content: message },
      })
      await userMessageHistory.save()

      const aiResponseHistory = new ChatHistory({
        user: 'test user',
        message: completion.choices[0].message,
      })
      await aiResponseHistory.save()

      const mp3 = await openai.audio.speech.create({
        model: 'tts-1',
        voice: audioModel || 'alloy',
        input: completion.choices[0].message.content,
      })

      console.log(speechFile)
      const buffer = Buffer.from(await mp3.arrayBuffer())
      await fs.promises.writeFile(speechFile, buffer)

      res.status(200).json({
        message: completion.choices[0].message,
        audioUrl: speechFile,
        testfield6: 'test6',
      })
    }
  } catch (error) {
    console.error(
      'Error:',
      error.response ? error.response.data : error.message
    )
  }
}

module.exports = { chatAi }

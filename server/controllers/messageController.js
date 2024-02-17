const Message = require('../models/message')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')

const ITEMS_PER_PAGE = 5

exports.message_list_get = asyncHandler(async (req, res, next) => {
  const page = req.query.page || 1
  const query = {}
  const skip = (page - 1) * ITEMS_PER_PAGE
  const countPromise = Message.estimatedDocumentCount(query)
  const messagesPromise = Message.find(query)
    .limit(ITEMS_PER_PAGE)
    .skip(skip)
    .sort({ added: -1 })
    .exec()
  const [count, messages] = await Promise.all([countPromise, messagesPromise])
  const pageCount = Math.ceil(count / ITEMS_PER_PAGE)

  res.json({
    pagination: {
      count,
      pageCount,
    },
    messages,
  })
})

exports.message_new_post = [
  body('text')
    .trim()
    .isLength({ min: 1 })
    .withMessage('You need to enter a message.')
    .isLength({ max: 180 }) // Fallback, maxLength is implemented at input level
    .withMessage('The message must not exceed 180 characters')
    .escape(),
  body('user')
    .trim()
    .isLength({ min: 1 })
    .withMessage('You need to enter a name.')
    .isLength({ max: 22 }) // Fallback, maxLength is implemented at input level
    .withMessage('The name must not exceed 22 characters')
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      // Form data is invalid
      res.status(422).json(errors.array())
      console.error(`Validation Error: ${errors.array().map(el => ` "${el['msg']}"`).toString()}`)
    } else {
      // Form data is valid
      const { text, user } = req.body
      await Message.create({ text: text, user: user })
      res.status(201).send()
    }
  }),
]

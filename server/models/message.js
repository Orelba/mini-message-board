const mongoose = require('mongoose')
const he = require('he')

const Schema = mongoose.Schema

const messageSchema = new Schema({
  text: { type: String, required: true },
  user: { type: String, required: true },
  added: { type: Date, default: Date.now },
})

// Unescape sanitized strings on the find query
messageSchema.post('find', function(docs) {
  docs.forEach(doc => {
    if (doc.text) {
      doc.text = he.decode(doc.text)
    }
    if (doc.user) {
      doc.user = he.decode(doc.user)
    }
  })
})

module.exports = mongoose.model('Message', messageSchema)

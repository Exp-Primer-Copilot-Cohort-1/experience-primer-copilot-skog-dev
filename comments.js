// Create web server
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// Middleware
app.use(bodyParser.json())
app.use(cors())

// Data
const comments = [
  { id: 1, title: 'Comment 1', content: 'This is comment 1' },
  { id: 2, title: 'Comment 2', content: 'This is comment 2' },
  { id: 3, title: 'Comment 3', content: 'This is comment 3' }
]

// GET /comments
app.get('/comments', (req, res) => {
  res.json(comments)
})

// POST /comments
app.post('/comments', (req, res) => {
  const comment = {
    id: comments.length + 1,
    title: req.body.title,
    content: req.body.content
  }
  comments.push(comment)
  res.status(201).json(comment)
})

// GET /comments/:id
app.get('/comments/:id', (req, res) => {
  const id = Number(req.params.id)
  const comment = comments.find(c => c.id === id)
  if (!comment) {
    return res.status(404).json({
      error: `Comment with id ${id} does not exist`
    })
  }
  res.json(comment)
})

// PUT /comments/:id
app.put('/comments/:id', (req, res) => {
  const id = Number(req.params.id)
  const comment = comments.find(c => c.id === id)
  if (!comment) {
    return res.status(404).json({
      error: `Comment with id ${id} does not exist`
    })
  }
  comment.title = req.body.title
  comment.content = req.body.content
  res.json(comment)
})

// DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
  const id = Number(req.params.id)
  const commentIndex = comments.findIndex(c => c.id === id)
  if (commentIndex === -1) {
    return res.status(404).json({
      error: `Comment with id ${id} does not exist`
    })
  }
  comments.splice(commentIndex, 1)
  res.status(204).end()
})

// Start server
const PORT = 3001
app.listen(PORT);
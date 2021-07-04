const commentsRouter = require("express").Router()
const Comment = require("../models/comment")

commentsRouter.post("/:id", async (req, res, next) => {
  const body = req.body
  const comment = new Comment({
    content: body.content
  })

  const savedComment = await comment.save()

  res.json(savedComment)
})

commentsRouter.get("/:id", async (req, res, next) => {
  const comment = await Comment.find()
  res.json(comment)
})

module.exports = commentsRouter

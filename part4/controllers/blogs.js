const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require('jsonwebtoken')

// const userExtractor = async (req, res, next) => {
//   const decodedToken = jwt.verify(req.token, process.env.SECRET)
//   if (!req.token || !decodedToken.id) {
//     return res.status(401).json({ error: 'token missing or invalid' }).end()
//   } else {
//     const user = await User.findById(decodedToken.id)
//     req.user = user
//   }
//   next()
//   return req.user
// }

// const getTokenFrom = async (req) => {
//   const authorization = await req.get('authorization')
//   await console.log(authorization)
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }

blogsRouter.get('/', async (req, res, next) => {
  const blogs = await Blog
    .find({}).populate("user", { username: 1, name: 1, id: 1})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res, next) => {
  // const token = getTokenFrom(req)
  const decodedToken = await jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  await console.log(req.token)
  const user = await User.findById(decodedToken.id)

  // token 
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEyMzQ1IiwiaWQiOiI2MGI3NTI4ZDYwMWZlMjcwNmNjYWQ0MjAiLCJpYXQiOjE2MjI2MjcwMDEsImV4cCI6MTYyMjYzMDYwMX0.ED-FkM_ngp-BV2tqL7DTMp42vFeKo0eRtWIq3z1EU7Q",

  // const user = await User.findById(body.userId)
  // console.log(req.token)
  // console.log(req.user)

  const body = req.body

  if (!body.title || !body.url) {
    res.status(400).end()
  } else {
    const blog = new Blog({
      url: body.url,
      title: body.title,
      author: body.author,
      likes: body.likes ? body.likes : 0,
      user: user._id
    })
    
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.json(savedBlog)
  }
})

blogsRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

blogsRouter.delete("/:id", async (req, res) => {
  // const token = getTokenFrom(req)
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const compare = await Blog.findById(req.params.id)
  if (compare.user._id.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(req.params.id)
    return res.status(204).end()
  } else {
    return res.status(401).json({ error: "token missing or invalid"})
  }
  
})

blogsRouter.put("/:id", async (req, res) => {
  // const token = getTokenFrom(req)
  // const decodedToken = jwt.verify(req.token, process.env.SECRET)
  // if (!req.token || !decodedToken.id) {
  //   return response.status(401).json({ error: 'token missing or invalid' })
  // }
  // const user = await User.findById(decodedToken.id)

  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.json(blog)
})


module.exports = blogsRouter

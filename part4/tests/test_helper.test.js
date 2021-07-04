const Blog = require('../models/blog')

// const initialNotes = [
//   {
//     content: 'HTML is easy',
//     date: new Date(),
//     important: false
//   },
//   {
//     content: 'Browser can execute only Javascript',
//     date: new Date(),
//     important: true
//   }
// ]

// const nonExistingId = async () => {
//   const note = new Note({ content: 'willremovethissoon', date: new Date() })
//   await note.save()
//   await note.remove()

//   return note._id.toString()
// }

const User = require('../models/user')

// ...

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  blogsInDb
}

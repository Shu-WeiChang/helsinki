const app = require('../app')
const supertest = require('supertest')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const api = supertest(app)
const mongoose = require('mongoose')
const { request } = require('express')

jest.setTimeout(100000);

describe("blog add", () => {
  test("blog add", async() => {
    const newBlog = {
      url: "http",
      title: "tiger",
      author: "artest",
      likes: 9,
    }
    await api.post("/api/blogs")
      .send(newBlog)
      .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEyMzQ1IiwiaWQiOiI2MGI3NTI4ZDYwMWZlMjcwNmNjYWQ0MjAiLCJpYXQiOjE2MjI2Mzg1ODUsImV4cCI6MTYyMjY0MjE4NX0.486eVS4tDCh9rBwZ7Shh57y_na4VxGS8PBQPgWUzGF4")
      .expect(200)

  })
  test("blog add fail", async() => {
    const res1 = await api.get("/api/blogs")
    await console.log(res1.body)
    const newBlog = {
      url: "http",
      title: "tiger",
      author: "artest",
      likes: 9,
    }
    await api.post("/api/blogs")
      .send(newBlog)
      // .set("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEyMzQ1IiwiaWQiOiI2MGI3NTI4ZDYwMWZlMjcwNmNjYWQ0MjAiLCJpYXQiOjE2MjI2MzM3MzgsImV4cCI6MTYyMjYzNzMzOH0.1O88Coj8Mg5jyFqt0GUOI6X6kgFSSAWwvqtxY9dRqdo")
      .expect(401)

  })
})


// describe("user check", () => {
//   test("user check", async() => {
//     const res1 = await api.get("/api/users")

//     await console.log(res1.body)

//     const newUser = {
//       username: "ro",
//       name: "ro",
//       password: "12345"
//     }

//     await api.post("/api/users")
//       .send(newUser)
//       .expect(400)

//     const res2 = await api.get("/api/users")

//     await console.log(res2.body)

//     expect(res1.body.length).toEqual(res2.body.length)
//   })
//   test("passwrod status", async() => {
//     const newUser = {
//       username: "rooo",
//       name: "rooo",
//       password: "1"
//     }

//     await api.post("/api/users")
//       .send(newUser)
//       .expect(401)
//   })
// })

// describe('when there is initially one user in db', () => {
//   beforeEach(async () => {
//     await User.deleteMany({})

//     const passwordHash = await bcrypt.hash('sekret', 10)
//     const user = new User({ username: 'root', passwordHash })

//     await user.save()
//   })

//   test('creation succeeds with a fresh username', async () => {
//     const usersAtStart = await helper.usersInDb()

//     const newUser = {
//       username: 'mluukkai',
//       name: 'Matti Luukkainen',
//       password: 'salainen',
//     }

//     await api
//       .post('/api/users')
//       .send(newUser)
//       .expect(200)
//       .expect('Content-Type', /application\/json/)

//     const usersAtEnd = await helper.usersInDb()
//     expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

//     const usernames = usersAtEnd.map(u => u.username)
//     expect(usernames).toContain(newUser.username)
//   })
// })

// describe('when there is initially one user in db', () => {
//   // ...

//   test('creation fails with proper statuscode and message if username already taken', async () => {
//     const usersAtStart = await helper.usersInDb()

//     const newUser = {
//       username: 'root',
//       name: 'Superuser',
//       password: 'salainen',
//     }

//     const result = await api
//       .post('/api/users')
//       .send(newUser)
//       .expect(400)
//       .expect('Content-Type', /application\/json/)

//     expect(result.body.error).toContain('`username` to be unique')

//     const usersAtEnd = await helper.usersInDb()
//     expect(usersAtEnd).toHaveLength(usersAtStart.length)
//   })
// })

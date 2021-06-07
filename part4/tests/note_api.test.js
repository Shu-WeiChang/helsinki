const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper.test')
const api = supertest(app)
const Blog = require('../models/blog')

// beforeEach(async () => {
//   await Note.deleteMany({})
//   console.log("cleared")
  
//   const noteObjects = helper.initialNotes
//     .map(note => new Note(note))
//   const promiseArray = noteObjects.map(note => note.save())
//   await Promise.all(promiseArray)
// })

jest.setTimeout(100000);

// test('blogs are returned as json', async () => {
//   await api
//     .get('/api/blogs')
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
// })

// test('there are two notes', async () => {
//   const response = await api.get('/api/blogs')

//   expect(response.body).toHaveLength(10)
// })

// test("id", async () => {
//   const res = await api.get("/api/blogs")
//   console.log(res.body)
//   expect(res).toBeDefined(res.body.id);
// })

// test('the first note is about HTTP methods', async () => {
//   const response = await api.get('/api/notes')

//   const contents = response.body.map(r => r.content)
//   expect(contents).toContain(
//     'Browser can execute only Javascript')
// })

// test('a valid note can be added', async () => {
//   const newBlog = {
//     title: 'async/await simplifies making async calls',
//     author: "Robinson",
//     url: "http",
//     likes: 5
//   }
//   const res = await api.get("/api/blogs")

//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(200)
//     .expect('Content-Type', /application\/json/)

//   const blogsAtEnd = await helper.blogsInDb()
//   expect(blogsAtEnd).toHaveLength(res.body.length + 1)
  
//   const contents = blogsAtEnd.map(b => b.title)
//   expect(contents).toContain(
//     'async/await simplifies making async calls'
//   )
// })

// test("likes property", async () => {
//   const newBlog = {
//     title: "hi",
//     author: "Rob",
//     url: "https",
//   }

//   const res = await api.get("/api/blogs")

//   await api
//     .post("/api/blogs")
//     .send(newBlog)
//     .expect(200)
//     .expect("Content-Type", /application\/json/)

//   const blogsAtEnd = await helper.blogsInDb()
//   expect(blogsAtEnd).toHaveLength(res.body.length + 1)

//   const contents = blogsAtEnd.map(b => b.likes)
//   expect(contents).toContain(0)
// })

// test('missing error', async () => {
//   const newBlog = {
//     author: "Robin",
//     likes: 3
//   }

//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(400)
// })

test("delete", async () => {
  await api.delete("/api/blogs/60b4d0fbc2245c656426e8dd").expect(204)
  await api.get("/api/blogs/60b4d0fbc2245c656426e8dd").expect(404)
})

// test('a specific note can be viewed', async () => {
//   const notesAtStart = await helper.notesInDb()

//   const noteToView = notesAtStart[0]

//   const resultNote = await api
//     .get(`/api/notes/${noteToView.id}`)
//     .expect(200)
//     .expect('Content-Type', /application\/json/)

//   const processedNoteToView = JSON.parse(JSON.stringify(noteToView))

//   expect(resultNote.body).toEqual(processedNoteToView)
// })

// test('a note can be deleted', async () => {
//   const notesAtStart = await helper.notesInDb()
//   const noteToDelete = notesAtStart[0]

//   await api
//     .delete(`/api/notes/${noteToDelete.id}`)
//     .expect(204)

//   const notesAtEnd = await helper.notesInDb()

//   expect(notesAtEnd).toHaveLength(
//     helper.initialNotes.length - 1
//   )

//   const contents = notesAtEnd.map(r => r.content)

//   expect(contents).not.toContain(noteToDelete.content)
// })

afterAll(() => {
  mongoose.connection.close()
})



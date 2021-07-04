const listHelper = require('../utils/list_helper')

// test('dummy returns one', () => {
//   const blogs = []

//   const result = listHelper.dummy(blogs)
//   expect(result).toBe(1)
// })

// describe('total likes', () => {
//   test('when list has only one blog, equals the likes of that', () => {
//     console.log(listHelper.blogList.map(likes => likes.likes))
//     const result = listHelper.totalLikes(listHelper.blogList.map(likes => likes.likes))
//     expect(result).toBe(36)
//   })
// })

// describe("favoriteBlog", () => {
//   test("blog with most likes", () => {
//     const array = (listHelper.blogList.map(likes => likes.likes))
//     const max = array.indexOf(Math.max(...array))
//     const result = listHelper.blogList[max]
//     console.log(max)
//     expect(result).toEqual(listHelper.blogList[2])
//   })
// })

// describe("mostBlogs", () => {
//   test("most productive author", () => {
//     const result = listHelper.mostBlogs(listHelper.blogList.map(blog => blog.author))
//     console.log(result);
//     expect(result).toEqual("Robert C. Martin")
//   })
// })

describe("mostLikes", () => {
  test("mostLikes", () => {
    const result = listHelper.mostLikes(listHelper.blogList)
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    })
  })
})

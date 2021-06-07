// Load the full build.
var _ = require('lodash');
// Load the core build.
// var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');
 
// Load method categories.
// var array = require('lodash/array');
// var object = require('lodash/fp/object');
// var collection = require("lodash/collection");


const dummy = (blogs) => {
  return 1;
}

const blogList = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

const totalLikes = (blogs) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
  const result = _.head(_(blogs)
    .countBy()
    .entries()
    .maxBy(_.last));
  return result;
}

// const array = (listHelper.blogList.map(blog => blog.author))
//     const result = _.head(_(array)
//       .countBy()
//       .entries()
//       .maxBy(_.last));

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  console.log(blogs.author)
  const author = blogs.map(author => author.author)
  const uniq = [... new Set(author)];
  const likesByAuthor = uniq.map((author) => {
    const blogsByAuthor = blogs.filter((blog) => blog.author === author)
    const countLikesPerAuthor = blogsByAuthor.reduce(
      (accumulator, currentValue) => accumulator + currentValue.likes,
      0,
    )
    const amountOfLikesByAuthor = {
      author: author,
      likes: countLikesPerAuthor,
    }
    return amountOfLikesByAuthor
  })
  return likesByAuthor.reduce((a, b) => (a.likes > b.likes ? a : b))
}

module.exports = {
  dummy,
  blogList,
  totalLikes,
  mostBlogs,
  mostLikes
}

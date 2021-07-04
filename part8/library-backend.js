const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./library-frontend/src/models/author')
const Book = require('./library-frontend/src/models/book')
const User = require("./library-frontend/src/models/user")
const jwt = require('jsonwebtoken')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const DataLoader = require('dataloader')


const JWT_SECRET = '11111'
// const { v1: uuid } = require('uuid')

const MONGODB_URI = "mongodb+srv://1234:4321@cluster0.7aqvf.mongodb.net/test?retryWrites=true&w=majority"
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

mongoose.set('debug', true);

const batchAuthors = async (keys) => {
  const authors = await Author.find({
    _id: {
      $in: keys,
    },
  });

  return keys.map(
    (key) =>
      authors.find((author) => author.id == key) ||
      new Error(`No result for ${key}`)
  );
};
// const userLoader = new DataLoader(keys => myBatchGetUsers(keys))

// const user = await userLoader.load(1)
// const invitedBy = await userLoader.load(user.invitedByID)
// console.log(`User 1 was invited by ${invitedBy}`)

// // Elsewhere in your application
// const user = await userLoader.load(2)
// const lastInvited = await userLoader.load(user.lastInvitedID)
// console.log(`User 2 last invited ${lastInvited}`)
// async function batchFunction(keys) {
//   const results = await db.fetchAllKeys(keys)
//   return keys.map(key => results[key] || new Error(`No result for ${key}`))
// }

// const loader = new DataLoader(batchFunction)


// let authors = [
//   {
//     name: 'Robert Martin',
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   { 
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   { 
//     name: 'Sandi Metz', // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's name in the context of the book instead of the author's id
 * However, for simplicity, we will store the author's name in connection with the book
*/

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ['agile', 'patterns', 'design']
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'patterns']
//   },  
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'revolution']
//   },
// ]

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genre: String): [Book]
    allAuthors: [Author]
    showBook: [Book]
    me: User
  }

  type Book {
    title: String
    published: Int
    author: Author
    id: ID!
    genres: [String]
  }

  type Author {
    name: String
    id: ID!
    born: Int
    bookCount: Int
  }

  type Subscription {
    bookAdded: Book!
    userlogin: User!
  }
  
  type Mutation {
    addBook(
      title: String!
      author: String
      published: Int
      genres: [String!]
    ): Book
    editAuthor(
      name: String
      born: Int
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    addAuthor(
      name: String!
      born: Int
    ): Author
  }
`

// "allAuthors": [
//   {
//     "name": "Robert Martin",
//     "id": "60cc7049c52ca128687c828e"
//   },
//   {
//     "name": "Martin Fowler",
//     "id": "60cc7064c52ca128687c829d"
//   },
//   {
//     "name": "Fyodor Dostoevsky",
//     "id": "60cc7075c52ca128687c82a8"
//   },
//   {
//     "name": "Joshua Kerievsky",
//     "id": "60ccb32346ace1412c87f887"
//   },
//   {
//     "name": "Sandi Metz",
//     "id": "60ccb33c46ace1412c87f896"
//   }
// ]


const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author });

        const books = await Book.find({
          $and: [
            { author: { $in: author.id } },
            { genres: { $in: args.genre } },
          ],
        }).populate("author");

        return books;
      } else if (args.author) {
        const author = await Author.findOne({ name: args.author });

        const books = await Book.find({ author: { $in: author.id } }).populate(
          "author"
        );
        return books;
      } else if (args.genre) {
        const books = await Book.find({ genres: { $in: args.genre } }).populate(
          "author"
        );
        return books;
      } else {
        return Book.find({}).populate("author");
      }
    },
    allAuthors: async () => {
      const authors = await Author.find({});

      const authorsObject = authors.map((author) => {
        return {
          name: author.name,
          born: author.born,
          bookCount: author.book.length,
          id: author.id,
        };
      })

      return authorsObject;
    },
    showBook: () => Book.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Book: {
    author: async (root, args, { loaders }) => {
      const id = root.author;

      const author = await loaders.author.load(root?.author?._id);

      return {
        name: author.name,
        born: author.born,
        bookCount: author.book.length,
        id: root?.author?._id
      };
    },
  },
  // Author: {
  //   bookCount: (root) => {
  //     // const array = books.map(book => book.author)
  //     // // console.log(array)
  //     // return array.filter(c => c === root.name).length;
  //     return root.book.length
  //   }
  // },
  Mutation: {
    addBook: async (root, args, context) => {
      let book;      

      try {
        let author = await Author.findOne({ name: args.author });
        const currentUser = context.currentUser

        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }

        if (author) {
          book = new Book({ ...args, author: author._id});
          author.book = author.book.concat(book._id);
          await book.save()
          await author.save()  
        }

        if (!author) {
          const _id = mongoose.Types.ObjectId();
          book = new Book({ ...args, author: _id });

          author = new Author({
            name: args.author,
            born: null,
            _id,
            book: [book._id],
            bookCount: 1
          });

          await author.save();
          await book.save();
        }
      } catch (err) {
          throw new UserInputError(err.message, {
            invalidArgs: args,
          })
        }
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    addAuthor: async (root, args, context) => {
      const author = new Author({ ...args })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      try {
        await author.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      author.born = args.born

      try {
        await author.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== JWT_SECRET) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      pubsub.publish('USER_LOGIN', { userlogin: user })
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    // console.log("token", auth)
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { 
        currentUser,
        loaders: {
          author: new DataLoader((keys) => batchAuthors(keys)),
        },
      };
    }
    return {
      loaders: {
        author: new DataLoader((keys) => batchAuthors(keys)),
      },
    };
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})

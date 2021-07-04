import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const CREATE_BOOK = gql`
mutation addBook($title: String!, $author: String, $published: Int, $genres: [String!]) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author {
      name
      born
    }
    published
    genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int) {
    editAuthor(name: $name, born: $born)  {
      name
      born
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
}
`

export const SHOW_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
        born
      }
      published
      genres
    }
  }
`

export const USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
        born
      }
      published
      genres
    }
  }
`

export const USER_LOGIN = gql`
  subscription {
    userlogin {
      username
      favoriteGenre
    }
  }
`

export const ALL_BOOK = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
        born
        bookCount
      }
      published
      genres
    }
  }
`

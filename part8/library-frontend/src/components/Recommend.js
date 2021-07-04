import React from "react"

const Recommend = ({props, userResult}) => {
    return (
      <>
        <h2>recommendations</h2>
        <p>books in your favorite <em>{userResult.favoriteGenre}</em></p>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
              </th>
              <th>
                published
              </th>
            </tr>
            {props.filter(p => p.genres.includes(userResult.favoriteGenre)).map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>
      </>
    )  
}

export default Recommend

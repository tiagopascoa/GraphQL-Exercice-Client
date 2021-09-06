import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_AUTHORS, ADD_BOOK_MUTATION, GET_BOOKS } from "../queries/queries";

export const AddBook = () => {
  const [book, setBook] = useState(
    {
      name: "",
      genre: "",
      authorId: "",
    },
    []
  );

  const { loading, error, data } = useQuery(GET_AUTHORS);
  const [addBook] = useMutation(ADD_BOOK_MUTATION);
  if (loading) return <option disabled>Loadind Authors</option>;
  if (error) return `Error! ${error.message}`;

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
    console.log("book state", book);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("book state for database:", book);
    addBook({
      variables: {
        name: book.name,
        genre: book.genre,
        authorId: book.authorId,
      },
      refetchQueries: [{ query: GET_BOOKS }],
    });
  };

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book Name:</label>
        <input type="text" name="name" onChange={handleChange} />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" name="genre" onChange={handleChange} />
      </div>

      <div className="field">
        <label>Author:</label>
        <select name="authorId" onChange={handleChange}>
          {data.authors.map((author) => {
            return (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            );
          })}
        </select>
      </div>

      <button type="submit">+</button>
    </form>
  );
};

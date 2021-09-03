import React from "react";
import { useQuery } from "@apollo/client";
import { GET_AUTHORS } from "../queries/queries";

function AddBook() {
  const { loading, error, data } = useQuery(GET_AUTHORS);

  if (loading) return <option disabled>Loadind Authors</option>;
  if (error) return `Error! ${error.message}`;

  return (
    <form id="add-book">
      <div className="field">
        <label>Book Name:</label>
        <input type="text" />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" />
      </div>

      <div className="field">
        <label>Author:</label>
        <select>
          {data.authors.map((author) => {
            return <option key={author.id} value={author.id}>{author.name}</option>;
          })}
        </select>
      </div>

      <button>+</button>
    </form>
  );
}

export default AddBook;

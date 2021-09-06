import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_BOOK } from "../queries/queries";

function BookDetails({ bookId }) {
  const [book, { loading, error, data }] = useLazyQuery(GET_BOOK);

  useEffect(() => {
    if (bookId) {
      book({ variables: { id: bookId } });
    }
  }, [bookId, book]);

  if (!bookId) return null;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  console.log(data);
  // for example purpose
  return <div>{JSON.stringify(data)}</div>;
}

export default BookDetails;

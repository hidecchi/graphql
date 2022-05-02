import React, { useState } from 'react';
import { useQuery } from "@apollo/client";
import { getBookQuery } from '../query/query';
import BookDetail from './BookDetail';

function BookList() {
  const { loading, error, data } = useQuery(getBookQuery);
  const [selected, setSelected] = useState(null);

  const displayBooks = function () {
    if (loading) return (<p>Loading...</p>);
    if (error) return (<p>Error</p>);
    return (
      data.books.map((book) => {
        return (<li key={book.id} onClick={()=>{setSelected(book.id)}}>{book.name}</li>)
      })
    )
  }

  return (
    <div>
      <ul className="book-list">
        {displayBooks()}
      </ul>
      <BookDetail bookid={selected} />
    </div>
  );
}

export default BookList;


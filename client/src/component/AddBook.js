import React, { useState } from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { getAuthorQuery, addBookMutation, getBookQuery } from '../query/query';




function AddBook() {
  const { loading, error, data } = useQuery(getAuthorQuery);
  // console.log(data);
  const displayAuthors = function () {
    if (loading) return <option disabled>Loading...</option>;
    if (error) return <option disabled>error...</option>;
    return (
      data.authors.map((author) => {
        return (<option key={author.id} value={author.id}>{author.name}</option>)
      })
    )
  }

  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorid, setAuthorid] = useState(null);

  const [addBook, { loading2, error2, data2 }] = useMutation(addBookMutation);
  if (loading2) return 'Submitting...';
  if (error2) return `Submission error! ${error.message}`;
  // console.log(data2);
  const handleSubmit = function (e) {
    e.preventDefault();
    addBook({
      variables: { name: name, genre: genre, authorid: authorid },
      refetchQueries: [{ query: getBookQuery }]
    });
  }

  return (
    <form onSubmit={(e) => { handleSubmit(e) }} className="add-form">
      <p className="text">本棚に本を追加する</p>
      <div className="item">
        <span>タイトル：</span>
        <input type="text" onChange={(e) => { setName(e.target.value) }} />
      </div>
      <div className="item">
        <span>ジャンル：</span>
        <input type="text" onChange={(e) => { setGenre(e.target.value) }} />
      </div>
      <div className="item">
        <span>作者：</span>
        <select name="" onChange={(e) => { setAuthorid(e.target.value) }} >
          <option value="">選択してください</option>
          {displayAuthors()}
        </select>
      </div>
      <div>
        <input type="submit" value="追加" />
      </div>
    </form>
  );
}

export default AddBook;


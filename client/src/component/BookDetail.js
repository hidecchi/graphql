import React from 'react';
import { useQuery } from "@apollo/client";
import { getBookDetailQuery } from '../query/query';

function BookDetail(props) {
    const { loading, error, data } = useQuery(getBookDetailQuery, {
        variables: { id: props.bookid },
    });
    // if (data !== undefined) {
    //     console.log(data.book);
    // }

    const displayBookDetail = function () {
        if (props.bookid === null) return null;
        if (loading) return <div>Loading...</div>;
        if (error) return null;
        return (
            <div className="book-detail">
                <h2>{data.book.name}</h2>
                <p>ジャンル：{data.book.genre}</p>
                <p>作者名：{data.book.author.name}</p>
                <p className="text">※この作者の全ての作品</p>
                <ul>
                    {data.book.author.books.map((item) => {
                        return <li key={item.id}>{item.name}</li>
                    })}
                </ul>
            </div>
        )
    }
    return (
        <div>
            {displayBookDetail()}
        </div>
    );
}

export default BookDetail;

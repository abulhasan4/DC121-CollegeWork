import { useState, useEffect } from "react";

function Book({ id }) {
    const [book, setBook] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/book/${id}/`)
            .then(response => response.json())
            .then(data => {
                setBook(data);
                setIsLoaded(true);
            })
            .catch(error => {
                console.error('Error fetching book:', error);
            });
    }, [id]);

    if (!isLoaded) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Year: {book.year}</p>
            <p>Price: {book.price}</p>
            <p>Synopsis: {book.synopsis}</p>
            <p>Category: {book.category}</p>
        </div>
    );
}

export default Book;

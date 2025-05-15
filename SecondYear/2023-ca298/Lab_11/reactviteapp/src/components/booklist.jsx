import { useState, useEffect } from "react";

function BookList() {
    const [books, setBooks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/book/')
            .then(response => response.json())
            .then(data => {
                setBooks(data);
                setIsLoaded(true);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    }, []);

    const displayBooks = () => {
        return books.map(book => (
            <li key={book.id}>{book.title}</li>
        ));
    };

    return (
        <div>
            <h2>Book List</h2>
            {isLoaded ? <ul>{displayBooks()}</ul> : <p>Loading...</p>}
        </div>
    );
}

export default BookList;

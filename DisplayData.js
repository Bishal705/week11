import React from 'react';
import { Link } from 'react-router-dom';

function DisplayData(props) {
    const Showbooks = () => {
        if (!props.Books || props.Books.length === 0) {
            return (
                <tr>
                    <td colSpan="7" className="text-center">No books found</td>
                </tr>
            );
        }

        return props.Books.map((book, index) => (
            <tr key={book._id}>
                <td>{book.booktitle}</td>
                <td>{book.PubYear}</td>
                <td>{book.author}</td>
                <td>{book.Topic}</td>
                <td>{book.formate}</td>
                <td>
                    <Link to={"/edit/" + book._id} className="btn btn-warning btn-sm">
                        Edit
                    </Link>
                </td>
                <td>
                    <Link to={"/Delete/" + book._id} className="btn btn-danger btn-sm">
                        Delete
                    </Link>
                </td>
            </tr>
        ));
    };

    return (
        <div>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>Book Title</th>
                        <th>Pub Year</th>
                        <th>Author</th>
                        <th>Subject</th>
                        <th>Formate</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <Showbooks />
                </tbody>
            </table>
        </div>
    );
}

export default DisplayData;
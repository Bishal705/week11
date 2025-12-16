import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

function DeleteBook() {
    const [book, setBook] = useState({});
    let params = useParams();
    let navigate = useNavigate();
    let url = "http://localhost:5000/";

    useEffect(() => {
        axios.get(url + "getbook/" + params.id)
            .then(res => {
                setBook(res.data);
            })
            .catch(err => {
                console.log("Error fetching book: ", err);
            });
    }, [params.id]);

    const handleDelete = () => {
        axios.delete(url + "deletebook/" + params.id)
            .then(res => {
                console.log("Book deleted successfully: ", res.data);
                navigate("/DisplayBooksF1"); // Redirect to display page
            })
            .catch(err => {
                console.log("Error deleting book: ", err);
            });
    };

    return (
        <div style={{ marginTop: 10 }}>
            <h3>Delete Book</h3>
            <div className="alert alert-danger">
                <p>Are you sure you want to delete the following book?</p>
                <p><strong>Title:</strong> {book.booktitle}</p>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Topic:</strong> {book.Topic}</p>
                <p><strong>Publication Year:</strong> {book.PubYear}</p>
            </div>
            <div className="form-group">
                <button onClick={handleDelete} className="btn btn-danger mr-2">
                    Confirm Delete
                </button>
                <button onClick={() => navigate("/DisplayBooksF1")} className="btn btn-secondary">
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default DeleteBook;
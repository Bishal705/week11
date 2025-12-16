import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

function Book_UpdateForm() {
    const [state, setState] = useState({
        booktitle: "",
        author: "",
        formate: "",
        Topic: "",
        PubYear: 1990,
    });
    
    let url = "http://localhost:5000/";
    let params = useParams();

    const handleChange = (e) => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value,
        });
    };

    // useEffect to Query the Book for a given Book ID
    useEffect(() => {
        axios.get('http://localhost:5000/getbook/' + params.id)
            .then(res => {
                console.log("update fun" + res.data)
                setState(res.data)
            })
            .catch(err => {
                console.log("error has occurred")
            })
    }, []);

    const OnSubmit = (e) => {
        e.preventDefault();
        const bookdata = {
            booktitle: state.booktitle,
            PubYear: state.PubYear,
            author: state.author,
            Topic: state.Topic,
            formate: state.formate
        };
        
        axios.post(url + "updatebook/" + params.id, bookdata)
            .then(res => console.log(res.data));
    };

    return (
        <div style={{ marginTop: 10 }}>
            <h3> Update Book Id: {params.id}</h3>
            <form onSubmit={OnSubmit} method="Post">
                <div className="form-group">
                    <label>Book Title: </label>
                    <input className="form-control" type="text" name="booktitle"
                        value={state.booktitle}
                        onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Book Authors: </label>
                    <input className="form-control" name="author"
                        value={state.author}
                        onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>
                        Pick Book topic :{" "}
                        <select className="form-control"
                            name="Topic" value={state.Topic}
                            onChange={handleChange}>
                            <option value="Computer Science">CS</option>
                            <option value="Programming">Programming</option>
                            <option value="Data Science">Data Science</option>
                            <option value="AI">AI</option>
                            <option value="Engineering">Engineering</option>
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label>Formate: </label>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input"
                            type="radio" name="formate" value="Hard Copy"
                            checked={state.formate === "Hard Copy"}
                            onChange={handleChange} />
                        <label className="form-check-label"> Hard Copy </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input"
                            type="radio" name="formate" value="Electronic Copy"
                            checked={state.formate === "Electronic Copy"}
                            onChange={handleChange} />
                        <label className="form-check-label"> Electronic Copy</label>
                    </div>
                </div>
                <div className="form-group">
                    <label>
                        Publication Year (between 1980 and 2025):
                        <input
                            type="range" name="PubYear"
                            min="1980" max="2025" value={state.PubYear}
                            onChange={handleChange} />
                        <span> {state.PubYear}</span>
                    </label>
                </div>
                <div className="form-group">
                    <center>
                        <input type="submit" value="Update Book" className="btn btn-primary" />
                    </center>
                </div>
            </form>
        </div>
    );
}

export default Book_UpdateForm;
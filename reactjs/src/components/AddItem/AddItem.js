import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import "../../css/edit-item.css"
import "../../css/add-item.css"
import "../../css/header-and-body.css"
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import {useHistory} from "react-router-dom";
import { Redirect } from 'react-router-dom'

function AddItem() {
    const history = useHistory();

    const fetchUserEmail = async () => {
        if (Cookies.get("Authorization") === undefined) {
            history.push("/index");
        }
    }

    useEffect(() => {
        fetchUserEmail();

    }, []);


    useEffect(() => { fetchCategories(); }, []);

    useEffect(() => { fetchOwners(); }, []);

    const [category, setItems] = useState([]);

    const fetchCategories = async () => {
        const response = await fetch('http://localhost:8080/api/categories',
            {
                method: 'GET',
                credentials: 'include',

            });
        const category = await response.json();
        setItems(category);
    }

    const [owners, setOwners] = useState([]);

    const fetchOwners = async () => {
        const response = await fetch('http://localhost:8080/users/renters',
            {
                method: 'GET',
                credentials: 'include',

            });
        const owners = await response.json();
        setOwners(owners);
    }

    const {register, handleSubmit, errors} = useForm();

    const onSubmit =  async (data) => {
        const headers = new Headers();
        headers.append('Content-type', 'application/json');
        console.log(data)

        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        }

        const request = new Request('http://localhost:8080/api/items', options);
        const response = await fetch(request);
        const status = await response.status;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 id="lets-get-started">Let's get started! </h1>
            <h2 id="show-what-u-got"> Show us what you've got</h2>

            <div className="inputs">
                <h4>What's your item?</h4>
                <input className="add-item-item-name" placeholder="OwnedItem name" name="name" ref={register({required: true, minLength: 3})}/>
                {errors.name && <p className="error-message">OwnedItem name is too short!</p>}
            <br/>


                <div id="input-image">
                    <a><img id="icon" src={require('../../assets/icon-with-mountain.svg')}/></a>
                    <a href="#" className="upload-image"> Click to upload image</a>
                </div>
                <h2 className="add-item-h2"> Describe your item</h2>
                <h4><label htmlFor="quest-type">Categories</label></h4>
                <select className="type-selector" id="quest-type" name="category.id" ref={register}>
                    <option value="" selected disabled hidden>Choose...</option>
                    {category.map(element => (
                        <option value={element.id}>{element.description}</option>
                    ))} </select>

                <p><br/>trzeba wybrać usera  nie mamy sesji:</p>
                <select className="type-selector" id="quest-type" name="owner.id" ref={register}>
                    <option value="" selected disabled hidden>Choose...</option>
                    {owners.map(element => (
                        <option value={element.id}>{element.firstName + element.lastName}</option>
                    ))} </select>


                <h4>Description:</h4>
                <textarea className="item-description" name="description" placeholder="Describe your item..."
                          ref={register({required: true, minLength: 10})}/>
                {errors.description && <p className="error-message">Description is too short!</p>}

                <h2 className="add-item-h2">How much? </h2>
                <h4>Price (PLN/per day):</h4>
                <input className="item-price" name="price" placeholder="Your price per day" ref={register({required: true, minLength: 1})}/>

                <h6>
                    By Clicking "Add item for rent", you agree to our <a href="#">Terms</a> and that you have
                    read our <a href="#"> Data Policy</a>.
                </h6>
                <div className="add-item-submit-button">
                    <button className="button" type="submit">Add item for rent</button>
                </div>
            </div>
        </form>
    )

}
export default AddItem;
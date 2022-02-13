import React, {useState} from 'react';
import { createProduct } from '../api';
import { useNavigate } from "react-router-dom";

const AdminEdit = ({isAdmin, token}) => {
    
    
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [category, setCategory] = useState();
    const [quantity, setQuantity] = useState();
    const [imgurl, setImage] = useState();
    const [instock, setInStock] = useState(true);
    
    let navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        await createProduct({ price, description, imgurl, quantity, category, title, instock}, token);
       
        navigate(`/products`)
    }

    return (
        <>
            { isAdmin ? (
            <><h2>Admin Portal</h2><form onSubmit={handleSubmit}>
                    <div id="TextField">
                        <input
                            type="text"
                            placeholder="Product Title"
                            value={title || ''}
                            onChange={(event) => setTitle(event.target.value)}

                        ></input>
                        <input
                            type="text"
                            placeholder="Product Description"
                            value={description || ''}
                            onChange={(event) => setDescription(event.target.value)}

                        ></input>
                        <input
                            type="text"
                            placeholder="Price"
                            value={price || ''}
                            onChange={(event) => setPrice(event.target.value)}

                        ></input>
                        <input
                            type="text"
                            placeholder="Product Image"
                            value={imgurl || ''}
                            onChange={(event) => setImage(event.target.value)}

                        ></input>
                        <input
                            type="text"
                            placeholder="Product Category"
                            value={category || ''}
                            onChange={(event) => setCategory(event.target.value)}

                        ></input>
                        <input
                            type="number"
                            placeholder="Quantity"
                            value={quantity || ''}
                            onChange={(event) => setQuantity(event.target.value)}

                        ></input>
                        <button>Submit</button>
                    </div>
                </form></>
            ): <div>Sorry you must be admin to view this page</div> }
        </>
        );
        }
        export default AdminEdit;
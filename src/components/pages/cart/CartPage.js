import React from "react";
import { 
    AppContext
 } from "../../../App"
import {
    NumberInput
} from "../../UI/input/number"
import {
    Link
} from "react-router-dom"
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

export const CartPage = () => {
    const {cart, addToCart, deleteFromCart, changeQuantity} = React.useContext(AppContext)
    if(cart.length == 0) {
        return <h1>Your Cart is Empty</h1>
    }
    return (<ul>{cart.map((cartItem) => (
        <li>
            <h1>{cartItem.name}</h1>
            <Link to={`/products/${cartItem.id}`}><img src={cartItem.img} height="100px"/></Link>
            <p>{cartItem.description}</p>
            <NumberInput value={cartItem.quantity} onChange={(quantity) => changeQuantity(cartItem.id, quantity)}/>
            <div style={{display: "flex"}}>
                <Button color="primary" style={{font: "18px"}} onClick={() => addToCart(cartItem.id)}>+</Button>
                <Button color="secondary" style={{font: "18px"}} onClick={() => changeQuantity(cartItem.id, cartItem.quantity - 1)}>-</Button>
                <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={() => deleteFromCart(cartItem.id)} >Delete</Button>
            </div>
        </li>
    ))}</ul>)
}
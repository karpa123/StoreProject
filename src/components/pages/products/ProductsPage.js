import React from "react";
import { 
    AppContext
 } from "../../../App"
import {
    Link,
    NavLink
} from "react-router-dom"
import IconButton from '@material-ui/core/IconButton'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Button from '@material-ui/core/Button'


export const ProductsPage = () => {
    const {products, addToCart, updateModalState} = React.useContext(AppContext)
    return <ul>{products.map((product) => (
        <li key={product.id} style={{marginBottom: 50}}>
            <Link to={`/products/${product.id}`}><img src={product.img} width="200"/></Link>
            <div>{product.name}</div>
            <p>{product.description}</p>
            <IconButton color="primary" aria-label="add to shopping cart" onClick={() => {
                addToCart(product.id)
                updateModalState({
                    title: product.name + " Added To Cart", 
                    description: "Go to Cart Page to See All the Products You've Added",
                    button: <NavLink exact={true} to="/cart" activeClassName="active"><Button variant="contained" color="primary" onClick={() => updateModalState()}>Primary</Button></NavLink>})}}>
                <AddShoppingCartIcon />
            </IconButton>
        </li>
    ))}</ul>
}
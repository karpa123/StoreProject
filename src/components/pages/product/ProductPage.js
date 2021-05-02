import React from "react";
import {
    AppContext
} from "../../../App"
import {
    useParams
} from "react-router-dom"
import IconButton from '@material-ui/core/IconButton'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

export const ProductPage = () => {
    const {productId} = useParams()
    const {products} = React.useContext(AppContext)
    const {addToCart} = React.useContext(AppContext)
    const selectedProduct = products.find((value) => {
        return value.id == productId
    })
    return (
        <div>
            <h1>{selectedProduct.name}</h1>
            <img src={selectedProduct.img}/>
            <p>{selectedProduct.description}</p>
            <IconButton color="primary" aria-label="add to shopping cart" onClick={() => addToCart(selectedProduct.id)}>
                <AddShoppingCartIcon />
            </IconButton>
        </div>
    )
}

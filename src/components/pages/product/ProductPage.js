import React from "react";
import {
    AppContext
} from "../../../App"
import {
    useParams
} from "react-router-dom"
import IconButton from '@material-ui/core/IconButton'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import {Select} from "../../UI/Select"

export const ProductPage = () => {
    const {productId} = useParams()
    const {products, addToCart} = React.useContext(AppContext)
    const [selectedCharacters, setSelectedCharacters] = React.useState({})

    const selectedProduct = products.find((value) => {
        return value.id == productId
    })

    const characters = Object.keys(selectedProduct.characters || {})

    return (
        <div>
            <h1>{selectedProduct.name}</h1>
            <img src={selectedProduct.img}/>
            <p>{selectedProduct.description}</p>
            {characters.map((key) => (
                <Select key={key} selected={selectedCharacters[key]} title={key} list={selectedProduct.characters[key]} onSelect={(selected) => {
                    setSelectedCharacters({...selectedCharacters, [key]: selected})
            }} />))}
            <IconButton color="primary" aria-label="add to shopping cart" onClick={() => addToCart(selectedProduct.id, selectedCharacters)}>
                <AddShoppingCartIcon />
            </IconButton>
        </div>
    )
}

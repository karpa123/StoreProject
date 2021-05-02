// MAKE BUTTONS AND INITIAL NAV PRETTIER https://material-ui.com/ru/components/app-bar/

import "./App.css"
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import {
  HomePage,
  ProductPage,
  ProductsPage,
  CartPage
} from "./components/pages"
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Modal from '@material-ui/core/Modal'

let initialModalState = {title: "", description: "", button: undefined}


export default function App() {
  const products = [{
    id: 0,
    name: "Vacuum",
    description: "lorem ipsum dolorem est lorem ipsum dolorem est lorem ipsum dolorem est lorem ipsum dolorem est lorem ipsum dolorem est lorem ipsum dolorem est",
    price: 1000,
    img: "https://www.shespeaks.com/pages/img/review/Eureka%20Pet%20Pal:Paw%20Vaccuum_09082009162421.jpg"
  }, {
    id: 104,
    name: "Swiffer",
    description: "lorem ipsum dolorem est lorem ipsum dolorem est lorem ipsum dolorem est lorem ipsum dolorem est lorem ipsum dolorem est lorem ipsum dolorem est",
    price: 40500,
    img: "https://b3h2.scene7.com/is/image/BedBathandBeyond/106058914419080p?$690$&wid=690&hei=690"
  }, {
    id: 18,
    name: "Mop",
    description: "lorem ipsum dolorem est lorem ipsum dolorem est lorem ipsum dolorem est lorem ipsum dolorem est lorem ipsum dolorem est lorem ipsum dolorem est",
    price: 300,
    img: "https://cdn.shopify.com/s/files/1/0280/4006/9155/products/Microfiber-Mop-System.jpg?v=1609258501"
  }]
  let [modalState, setModalState] = React.useState(initialModalState)
  const [cart, setCart] = React.useState([])
  const addToCart = (productId) => {
    const selectedProduct = products.find((value) => {
        return value.id == productId
    })
    let selectedCartProduct = cart.find((value) => {
      return value.id == productId
    })
    if(selectedCartProduct) {
      setCart(cart.map((value) => {
        return value.id == productId ? {...value, quantity: value.quantity + 1} : value
      }))
    } else {
      setCart([...cart, {...selectedProduct, quantity: 1}])
    }
  }

  const deleteFromCart = (productId) => {
    setCart(cart.filter((value) => value.id != productId))
  }
  
  const changeQuantity = (productId, quantity) => {
    setCart(!quantity 
      ? 
      cart.filter((value) => value.id != productId) 
      :
      cart.map((value) => (value.id == productId ? {...value, quantity} : value)))
  }

const updateModalState = (state) => {
  setModalState(state || initialModalState)
}
 
  return (
    <Router>
      <Modal
          open={Boolean(modalState.title)}
          onClose={() => updateModalState()}>
            <div className="modalPopup">  
              <h3>{modalState.title}</h3>
              <div>{modalState.description}</div>
              {modalState.button}
            </div>
      </Modal>
      <div>
        <nav>
          <ul>
            <li>
              <NavLink exact={true} to="/" activeClassName="active">Home</NavLink>
            </li>
            <li>
              <NavLink exact={true} to="/cart" activeClassName="active">Cart</NavLink>
            </li>
            <li>
              <NavLink exact={true} to="/products" activeClassName="active">Products</NavLink>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <AppContext.Provider value={{products, addToCart, deleteFromCart, cart, changeQuantity, updateModalState}}>
          <main>
            <Switch>
              <Route path="/products/:productId">
                <ProductPage />
              </Route>
              <Route path="/products">
                <ProductsPage />
              </Route>
              <Route path="/cart">
                <CartPage />
              </Route>
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>
          </main>
        </AppContext.Provider>
      </div>
    </Router>
  );
}

export const AppContext = React.createContext({products: [], cart: [], addToCart: () => {}, deleteFromCart: () => {}, changeQuantity: () => {}, updateModalState: () => {}})
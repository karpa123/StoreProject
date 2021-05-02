// MAKE BUTTONS AND INITIAL NAV PRETTIER https://material-ui.com/ru/components/app-bar/

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
import {Popup} from "./components/Popup"
import {products} from "./static/products"
import {Header} from "./components/Header"
import {initialModalState} from "./components/Popup"

export default function App() {
  const [modalState, setModalState] = React.useState(initialModalState)
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
      <Popup {...modalState} onClose={() => updateModalState()} />
      <div>
        <Header />

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
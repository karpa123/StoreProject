import React from "react";
import {
  NavLink
} from "react-router-dom";


export const Header = () => {
  return (
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
  )
}

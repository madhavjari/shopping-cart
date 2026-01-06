import { useState } from "react";
import styles from "./App.module.css";
import { Link, Outlet } from "react-router";

function App() {
  const [products, setProducts] = useState([]);
  const [productInCart, setProductInCart] = useState([]);

  const totalItems = productInCart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  return (
    <div>
      <div className={styles.titleBar}>
        <header>
          <h1>Frenzy Cart</h1>
        </header>
        <nav>
          <Link to="/">
            <h2>Home</h2>
          </Link>
          <Link to="shop">
            <h2>Shop</h2>
          </Link>
          <Link to="cart">
            <h2>Cart {totalItems === 0 ? null : totalItems}</h2>
          </Link>
        </nav>
      </div>
      <Outlet
        context={{ setProductInCart, productInCart, products, setProducts }}
      />
    </div>
  );
}

export default App;

import { useState } from "react";
import styles from "./App.module.css";
import { Link, Outlet } from "react-router";

function App() {
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
            <h2>Cart</h2>
          </Link>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}

export default App;

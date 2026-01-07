import { useOutletContext } from "react-router";
import styles from "./CartPage.module.css";

function CartPage() {
  const { setProductInCart, productInCart, products, setProducts } =
    useOutletContext();
  const updateCart = (amount, id) => {
    let updatedCart;
    updatedCart = productInCart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, (item.quantity || 0) + amount) }
          : item
      )
      .filter((item) => item.quantity !== 0);
    setProductInCart(updatedCart);
  };
  return (
    <>
      <h1>My cart</h1>
      <h2>Free Shipping for Members</h2>
      <h3>
        Join us Now. <a href="/">Click here.</a>
      </h3>
      <h2>Bag</h2>
      {productInCart.map((product) => {
        return (
          <div className={styles.cartContainer}>
            <img src={product.image} alt="" />
            <h3>{product.title}</h3>
            <div>
              <button onClick={() => updateCart(-1, product.id)}>-</button>
              <div>{product.quantity || 0}</div>
              <button onClick={() => updateCart(1, product.id)}>+</button>
            </div>
            <h3>{product.price * product.quantity}</h3>
          </div>
        );
      })}
    </>
  );
}

export default CartPage;

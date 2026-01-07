import { useOutletContext } from "react-router";
import styles from "./CartPage.module.css";

function CartPage() {
  const { setProductInCart, productInCart, totalItems } = useOutletContext();
  const totalAmount = productInCart.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);
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
    <div className={styles.mainContainer}>
      <h1>My cart</h1>
      <h2>Free Shipping for Members</h2>
      <h3>
        Join us Now. <a href="/">Click here.</a>
      </h3>
      <h2>Bag</h2>
      <div className={styles.cartContainer}>
        {productInCart.length !== 0 ? (
          <div className={styles.cartHeader}>
            <h3>Product</h3>
            <h3>Price/unit</h3>
            <h3>Unit</h3>
            <h3>Total Price</h3>
          </div>
        ) : null}
        {productInCart.length === 0 ? (
          <h3>Cart is Empty</h3>
        ) : (
          productInCart.map((product) => {
            return (
              <div className={styles.cartProduct}>
                <div className={styles.productInfo}>
                  <img src={product.image} alt="" />
                  <h3>{product.title}</h3>
                </div>
                <h3>₹{product.price}</h3>
                <div className={styles.buttonDiv}>
                  <button onClick={() => updateCart(-1, product.id)}>-</button>
                  <div>{product.quantity || 0}</div>
                  <button onClick={() => updateCart(1, product.id)}>+</button>
                </div>
                <h3>₹{product.price * product.quantity}</h3>
              </div>
            );
          })
        )}
        {productInCart.length !== 0 ? (
          <>
            <div className={styles.cartTotal}>
              <h3>Cart Total</h3>
              <h3>{totalItems}</h3>
              <h3>₹{totalAmount}</h3>
            </div>
            <div className={styles.cartBuy}>
              <button>
                <h3>Buy Now</h3>
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default CartPage;

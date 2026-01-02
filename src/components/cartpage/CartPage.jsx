import { useOutletContext } from "react-router";

function CartPage() {
  const { setProductInCart, productInCart, products, setProducts } =
    useOutletContext();
  console.log(products.length);
  console.log(Object.keys(productInCart));
  return (
    <>
      <h1>My cart</h1>
      <h2>Free Shipping for Members</h2>
      <h3>
        Join us Now. <a href="/">Click here.</a>
      </h3>
      <h2>Bag</h2>
      <h3>{}</h3>
    </>
  );
}

export default CartPage;

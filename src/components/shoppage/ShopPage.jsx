import { useEffect, useState } from "react";
import styles from "./ShopPage.module.css";
import { useOutletContext } from "react-router";

function ShopPage() {
  const { setProductInCart, productInCart } = useOutletContext();
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/", {
      headers: {
        "User-Agent": "the-odin-project",
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => {
        setProducts(response);
        const initialCart = {};
        response.forEach((p) => (initialCart[p.id] = 0));
        setProductInCart(initialCart);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);
  if (loading)
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
      </div>
    );
  if (error) return <p>A network error was encountered</p>;
  console.log(productInCart);
  return (
    products && (
      <section className={styles.shopSection}>
        {products.map((product) => {
          return (
            <ShopList
              key={product.id}
              product={product}
              setProductInCart={setProductInCart}
              quantity={productInCart[product.id] || 0}
            />
          );
        })}
      </section>
    )
  );
}

function ShopList({ product, setProductInCart, quantity }) {
  const updateCart = (amount) => {
    setProductInCart((prev) => ({
      ...prev,
      [product.id]: Math.max(0, (prev[product.id] || 0) + amount),
    }));
  };

  const priceInRupees = Math.floor(product.price * 91, 0);
  return (
    <article className={styles.shopArticle}>
      <img src={product.image} alt="" />
      <p>{product.title}</p>
      <div>
        <p>&#8377;{priceInRupees}</p>
        <div>
          <button onClick={() => updateCart(-1)}>-</button>
          <div>{quantity}</div>
          <button onClick={() => updateCart(1)}>+</button>
        </div>
      </div>
    </article>
  );
}

export default ShopPage;

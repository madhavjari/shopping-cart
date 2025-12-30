import { useEffect, useState } from "react";
import styles from "./ShopPage.module.css";

function ShopPage() {
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
      .then((response) => setProducts(response))
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
  return (
    products && (
      <section className={styles.shopSection}>
        {products.map((product) => {
          return <ShopList key={product.id} product={product} />;
        })}
      </section>
    )
  );
}

function ShopList({ product }) {
  const [inCart, setInCart] = useState(0);
  const subtractOneFromCart = () => {
    inCart === 0 ? setInCart(0) : setInCart(inCart - 1);
  };
  const addOneToCart = () => {
    setInCart(inCart + 1);
  };
  const priceInRupees = product.price * 91;
  return (
    <article className={styles.shopArticle}>
      <img src={product.image} alt="" />
      <p>{product.title}</p>
      <div>
        <p>&#8377;{priceInRupees}</p>
        <div>
          <button onClick={subtractOneFromCart}>-</button>
          <div>{inCart}</div>
          <button onClick={addOneToCart}>+</button>
        </div>
      </div>
    </article>
  );
}

export default ShopPage;

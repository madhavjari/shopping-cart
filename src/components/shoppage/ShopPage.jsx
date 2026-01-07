import { useEffect, useState } from "react";
import styles from "./ShopPage.module.css";
import { useOutletContext } from "react-router";

function ShopPage() {
  const { setProductInCart, productInCart, products, setProducts } =
    useOutletContext();

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
  return (
    products && (
      <section className={styles.shopSection}>
        {products.map((product) => {
          return (
            <ShopList
              key={product.id}
              product={product}
              setProductInCart={setProductInCart}
              productInCart={productInCart}
            />
          );
        })}
      </section>
    )
  );
}

function ShopList({ product, setProductInCart, productInCart }) {
  const idFind = productInCart.find((item) => item.id === product.id);
  const quantity = idFind ? idFind.quantity : 0;
  const updateCart = (amount) => {
    const idCheck = productInCart.find((item) => item.id === product.id);
    let updatedCart;
    if (idCheck) {
      updatedCart = productInCart
        .map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.max(0, (item.quantity || 0) + amount) }
            : item
        )
        .filter((item) => item.quantity !== 0);
    } else {
      updatedCart = [
        ...productInCart,
        {
          id: product.id,
          quantity: Math.max(0, (quantity || 0) + amount),
          title: product.title,
          image: product.image,
          price: Math.floor(product.price * 91, 0),
        },
      ];
    }
    setProductInCart(updatedCart);
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
          <div>{quantity || 0}</div>
          <button onClick={() => updateCart(1)}>+</button>
        </div>
      </div>
    </article>
  );
}

export default ShopPage;

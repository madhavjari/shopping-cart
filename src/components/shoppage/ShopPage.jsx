import { useEffect, useState } from "react";

function ShopPage() {
  const [product, setProduct] = useState(null);
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
      .then((response) => setProduct(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;
  return product && <ShopList products={product} />;
}

function ShopList({ products }) {
  return (
    <div>
      {products.map((p) => {
        return (
          <div>
            <img src={p.image} alt="" />
            <p>{p.title}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ShopPage;

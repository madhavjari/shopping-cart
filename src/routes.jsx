import App from "./App";
import ErrorPage from "./components/ErrorPage";
import HomePage from "./components/homepage/HomePage";
import ShopPage from "./components/shoppage/ShopPage";
import CartPage from "./components/cartpage/CartPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "shop", element: <ShopPage /> },
      { path: "cart", element: <CartPage /> },
    ],
  },
];

export default routes;

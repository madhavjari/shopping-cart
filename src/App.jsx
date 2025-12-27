import "./App.css";
import { Link, Outlet } from "react-router";

function App() {
  return (
    <div>
      <header>
        <h1>Frenzy Cart</h1>
        <Link to="home">Home</Link>
        <Link to="shop">Shop</Link>
        <Link to="cart">Cart</Link>
      </header>
      <Outlet />
    </div>
  );
}

export default App;

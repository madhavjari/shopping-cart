import titlePic from "../../assets/shop-background.jpg";
import styles from "./HomePage.module.css";
import { Link } from "react-router";

function HomePage() {
  return (
    <div className={styles.mainContainer}>
      <header>
        <h1>Frenzy Cart</h1>
        <h2>Your ultimate stop for clothing needs.</h2>
        <img src={titlePic} alt="Home page photo" className={styles.homePic} />
        <a href="https://www.freepik.com/free-photo/two-young-beautiful-girlfriends-are-walking-style-loft-showroom-stylish-things-with-gift-bags-smiling-each-other_18455173.htm#fromView=search&page=1&position=9&uuid=c8c53623-dd3d-4e79-bb0b-a767a8d60b5f&query=clothing+store"></a>
        <p>
          <Link to="shop">Shop Now</Link>
        </p>
      </header>
      <section>
        <h2>Why shop with us?</h2>
        <div>
          <div>
            <h3>Fast shipping</h3>
            <h4>Get your products in two days.</h4>
          </div>
          <div>
            <h3>Best prices</h3>
            <h4>We match any competitor.</h4>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

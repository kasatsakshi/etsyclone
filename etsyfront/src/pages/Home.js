import React from "react";
import './Home.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductTile from "../components/ProductTile";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user.currentUser);
  let firstName;
  if (user && user.name) {
    firstName = user.name.split(" ")[0];
  } else {
    firstName = "Guest"
  }
  return (
    <div>
      <Navbar />
      <div>
        {user ?
          <div className="home__announcement">
            <h1 className="home__announcementText">Welcome, {firstName}</h1>
            <ProductTile />
          </div> :
          <div>

          </div>
        }
      </div>
      <Footer />
    </div>
  );
};

export default Home;
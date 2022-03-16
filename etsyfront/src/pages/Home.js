import React from "react";
import './Home.css';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import Announcement from "../components/Announcement";
// import Categories from "../components/Categories";
// import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProductTile from "../components/ProductTile";
import { accountInfo } from "../redux/user";
import { useDispatch, useSelector } from "react-redux";
import { grey } from "@mui/material/colors";
import UploadImage from "../components/UploadImage";
// import Newsletter from "../components/Newsletter";
// import Products from "../components/Products";
// import Slider from "../components/Slider";

const Home = () => {
  const user = useSelector((state) => state.user.currentUser);
  let firstName;
  if(user && user.name) {
    firstName = user.name.split(" ")[0];
  } else {
    firstName = "Guest"
  }
  return (
    <div>
      <Navbar />
      {/* <Announcement /> */}
      {user ?
      <div className="home__announcement">
        <h1 className="home__announcementText">Welcome, {firstName}</h1>
        <ProductTile />

        <UploadImage type="user" id={user.email} />
      </div> :
      <div>
      
      </div>
      }

      {/* <Slider />
      <Categories />
      <Products/>
      <Newsletter/>
      <Footer/> */}
    </div>
  );
};

export default Home;
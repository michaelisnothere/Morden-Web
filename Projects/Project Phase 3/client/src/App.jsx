import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "../components/HomePage";
import Videos from "../components/Videos";
import Images from "../components/Images";
import Articles from "../components/Articles";
import Login from "../components/Login";
import Upload from "../components/Upload";
import Register from "../components/Register";
import Profile from "../components/Profile";
import Navigator from "../Navigation/Navigator";
import Footer from "../Navigation/Footer";
import VideoDetails from "../components/Video-details";
import ImageDetails from "../components/Image-details";
import ArticleDetails from "../components/Article-details";

const App = () => {
  return (
    <Router>
      <Navigator />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/pictures" element={<Images />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/video-details/:id" element={<VideoDetails />} />
        <Route path="/image-details/:id" element={<ImageDetails />} />
        <Route path="/article-details" element={<ArticleDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

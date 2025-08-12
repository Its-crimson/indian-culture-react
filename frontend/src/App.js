import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSlider from "./components/HeroSlider";
import CultureGrid from "./components/CultureGrid";
import RegionalShowcase from "./components/RegionalShowcase";
import FeaturedStories from "./components/FeaturedStories";

const Home = () => {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <HeroSlider />
      
      {/* Cultural Categories */}
      <CultureGrid />
      
      {/* Featured Stories */}
      <FeaturedStories />
      
      {/* Regional Showcase */}
      <RegionalShowcase />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
import React from 'react';
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  return (
    <>
      <Navbar />
        <Home />
        <About />
        <Contact />
        <Login />
        <Signup />
    </>
  );
}

export default App;

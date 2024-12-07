import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieSearch from "./components/MovieSearch";
// import './App.css'
import "./index.css";
import MovieDetails from "./components/MovieDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MovieSearch />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

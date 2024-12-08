import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // Import Font Awesome icon
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [owned, setOwned] = useState(false);

  const API_URL = `https://api.themoviedb.org/3/movie/${id}`;
  const AUTH_HEADER = {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_BEARER}`,
    },
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(API_URL, AUTH_HEADER);
        setMovie(response.data);
      } catch (err) {
        setError("Failed to fetch movie details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    const ownedMovies = JSON.parse(localStorage.getItem("ownedMovies")) || [];
    setOwned(ownedMovies.includes(Number(id)));
  }, [id]);

  const toggleOwned = () => {
    const ownedMovies = JSON.parse(localStorage.getItem("ownedMovies")) || [];
    if (owned) {
      const updatedOwnedMovies = ownedMovies.filter((movieId) => movieId !== Number(id));
      localStorage.setItem("ownedMovies", JSON.stringify(updatedOwnedMovies));
    } else {
      ownedMovies.push(Number(id));
      localStorage.setItem("ownedMovies", JSON.stringify(ownedMovies));
    }
    setOwned(!owned);
  };

  if (loading) {
    return <div className="text-center text-white mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="md:container mx-auto min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      {/* Back Button with Icon */}
      <button
        onClick={() => window.history.state && window.history.state.idx > 0 ? navigate(-1) : navigate("/")}
        className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mb-6"
      >
        <FaArrowLeft className="mr-2" /> {/* Icon with margin */}
        Back to Search
      </button>

      {/* Movie Title */}
      <h1 className="text-3xl font-bold text-center mb-4">{movie.title}</h1>

      {/* Movie Poster */}
      <div className="w-64 h-96 mb-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Movie Details */}
      <div className="max-w-2xl text-center">
        <p className="text-gray-400 mb-4 italic">{movie.release_date}</p>
        <p className="text-gray-300 mb-6">{movie.overview}</p>

        <div className="grid grid-cols-2 gap-4 text-left text-gray-300">
          <div>
            <span className="font-bold">Rating:</span> {movie.vote_average} / 10
          </div>
          <div>
            <span className="font-bold">Runtime:</span> {movie.runtime} minutes
          </div>
          <div className="col-span-2">
            <span className="font-bold">Genres:</span>{" "}
            {movie.genres.map((genre) => genre.name).join(", ")}
          </div>
        </div>
      </div>

      {/* Mark as Owned Button */}
      <button
        onClick={toggleOwned}
        className={`mt-6 px-4 py-2 rounded ${
          owned ? "bg-green-600 text-white" : "bg-gray-700 text-gray-300"
        } transition-all duration-200 hover:bg-green-500 hover:text-white`}
      >
        {owned ? "Owned" : "Mark as Owned"}
      </button>
    </div>
  );
};

export default MovieDetails;
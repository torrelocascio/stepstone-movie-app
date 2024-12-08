import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const [owned, setOwned] = useState(false);

  // Check localStorage on component mount to see if the movie is owned
  useEffect(() => {
    const ownedMovies = JSON.parse(localStorage.getItem("ownedMovies")) || [];
    setOwned(ownedMovies.includes(movie.id));
  }, [movie.id]);

  // Toggle the "owned" state and update localStorage
  const toggleOwned = () => {
    const ownedMovies = JSON.parse(localStorage.getItem("ownedMovies")) || [];
    if (owned) {
      // Remove the movie ID from the ownedMovies list
      const updatedOwnedMovies = ownedMovies.filter((id) => id !== movie.id);
      localStorage.setItem("ownedMovies", JSON.stringify(updatedOwnedMovies));
    } else {
      // Add the movie ID to the ownedMovies list
      ownedMovies.push(movie.id);
      localStorage.setItem("ownedMovies", JSON.stringify(ownedMovies));
    }
    setOwned(!owned);
  };

  const truncateText = (text, limit) => {
    if (!text) return "No description available";
    return text.length > limit ? `${text.slice(0, limit)}...` : text;
  };

  return (
    <div className="block">
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="bg-gray-800 text-white rounded-lg shadow-lg border border-gray-700 overflow-hidden flex flex-col h-[500px] transition-all duration-300 hover:shadow-2xl hover:scale-105">
          <div className="w-full h-[300px]">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 flex-grow flex flex-col justify-start select-text">
            <div>
              <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{movie.release_date}</p>
            </div>
            <div className="overflow-y-auto text-sm text-gray-300">
              {truncateText(movie.overview, 75)}
            </div>
          </div>
        </div>
      </Link>
      <button
        onClick={toggleOwned}
        className={`mt-2 px-4 py-2 rounded ${
          owned ? "bg-green-600 text-white" : "bg-gray-700 text-gray-300"
        } transition-all duration-200 hover:bg-green-500 hover:text-white`}
      >
        {owned ? "Owned" : "Mark as Owned"}
      </button>
    </div>
  );
};

export default MovieCard;

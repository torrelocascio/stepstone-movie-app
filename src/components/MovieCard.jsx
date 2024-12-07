import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg border border-gray-700 overflow-hidden">
        <div className="w-full h-[400px]">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
          <p className="text-sm text-gray-400 mb-4">{movie.release_date}</p>
          <p className="text-sm text-gray-300">{movie.overview.slice(0, 100)}...</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
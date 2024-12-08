import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieCard from "./MovieCard";
import Spinner from "./Spinner";
import Pagination from "./Pagination";

const MovieSearch = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [groupedByCategory, setGroupedByCategory] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page")) || 1;

  const API_URL = "https://api.themoviedb.org/3/search/movie";
  const AUTH_HEADER = {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_BEARER}`,
    },
  };

  const fetchMovies = async () => {
    if (!query.trim()) {
      setMovies([]);
      setTotalResults(0);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${API_URL}?query=${query}&page=${page}`,
        AUTH_HEADER
      );
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
      setTotalResults(response.data.total_results);
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchMovies();
    }
  }, [query, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements.query.value.trim();
    if (searchQuery) {
      setSearchParams({ query: searchQuery, page: 1 });
    } else {
      setSearchParams({});
    }
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ query, page: newPage });
  };

  const renderMoviesByCategory = () => {
    if (!movies.length) return null;

    const genresMap = {};
    movies.forEach((movie) => {
      if (movie.genre_ids) {
        movie.genre_ids.forEach((genreId) => {
          if (!genresMap[genreId]) {
            genresMap[genreId] = [];
          }
          genresMap[genreId].push(movie);
        });
      }
    });

    // Mock genre names for simplicity
    const genreNames = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      18: "Drama",
      27: "Horror",
      878: "Science Fiction",
    };

    return (
      <div className="w-full max-w-5xl">
        {Object.keys(genresMap).map((genreId) => (
          <div key={genreId} className="mb-6">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">
              {genreNames[genreId] || "Other"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {genresMap[genreId].map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto flex flex-col items-center p-6 bg-gray-900 min-h-screen text-white">
      {/* Search Form */}
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-6">Movie Search</h1>
        <form
          onSubmit={handleSearch}
          className="block flex items-center sm:space-x-2 justify-center flex-wrap sm:space-y-0 mb-4 gap-2"
        >
          <input
            type="text"
            name="query"
            defaultValue={query}
            placeholder="Search for a movie..."
            className="min-w-[300px] flex-grow bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            id="search-movies-button"
            className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </form>

        {/* Show total results and categories only if a query exists */}
        {query && (
          <p className="text-gray-400">
            Found{" "}
            <span className="text-blue-400 font-bold">{totalResults}</span>{" "}
            result{totalResults === 1 ? "" : "s"} in various categories.
          </p>
        )}

        {movies.length > 0 && (
          <>
            <button
              onClick={() => setGroupedByCategory((prev) => !prev)}
              className="mt-4 bg-green-600 px-6 py-2 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500"
            >
              {groupedByCategory ? "View In List" : "View By Categories"}
            </button>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>

      {/* Results Section */}
      {loading && <Spinner />}
      {error && <div className="text-red-500 text-center mb-6">{error}</div>}

      {!loading && !error && query && (
        <div className="w-full max-w-5xl mt-6">
          {movies.length > 0 ? (
            <>
              {groupedByCategory ? (
                renderMoviesByCategory()
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              )}
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <p className="text-center text-gray-500 text-lg mt-10">
              No movies found. Try a different search term.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieSearch;

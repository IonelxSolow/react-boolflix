import { createContext, useContext, useState, useEffect } from "react";

const MoviesContext = createContext();

export const useMovies = () => useContext(MoviesContext);

export const MoviesProvider = ({ children }) => {
  const [contents, setContents] = useState([]);
  const [searchText, setSearchText] = useState("");

  const api_key = import.meta.env.VITE_MOVIE_DB_API_KEY;

  const normalizeData = (item, type) => ({
    id: item.id,
    title: type === "movie" ? item.title : item.name,
    original_title: type === "movie" ? item.original_title : item.original_name,
    original_language: item.original_language,
    vote_average: item.vote_average,
    poster_path: item.poster_path,
    media_type: type,
  });

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`)
      .then((res) => res.json())
      .then(({ results }) => {
        const normalizedMovies = results.map((movie) =>
          normalizeData(movie, "movie")
        );
        setContents(normalizedMovies);
      });
  }, []);

  const searchContents = async () => {
    if (!searchText) return;

    try {
      const [movieRes, tvRes] = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchText}`
        ),
        fetch(
          `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${searchText}`
        ),
      ]);

      const movieData = await movieRes.json();
      const tvData = await tvRes.json();

      const normalizedMovies = movieData.results.map((movie) =>
        normalizeData(movie, "movie")
      );
      const normalizedTv = tvData.results.map((tv) => normalizeData(tv, "tv"));

      setContents([...normalizedMovies, ...normalizedTv]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const values = {
    contents,
    searchText,
    setSearchText,
    searchContents,
  };

  return (
    <MoviesContext.Provider value={values}>{children}</MoviesContext.Provider>
  );
};

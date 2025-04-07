import { createContext, useContext, useState, useEffect } from "react";

const MoviesContext = createContext();

export const useMovies = () => useContext(MoviesContext);

export const MoviesProvider = ({ children }) => {
  const [contents, setContents] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const api_key = import.meta.env.VITE_MOVIE_DB_API_KEY;

  const fetchDetails = async (id, type) => {
    try {
      const [detailsRes, creditsRes] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${api_key}&language=it-IT`),
        fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${api_key}`)
      ]);

      const details = await detailsRes.json();
      const credits = await creditsRes.json();

      return {
        genres: details.genres?.map(g => g.name).join(", "),
        cast: credits.cast?.slice(0, 5).map(actor => `${actor.name}`).join(", ")
      };
    } catch (error) {
      console.error("Error fetching details:", error);
      return { genres: "", cast: "" };
    }
  };

  const normalizeData = async (item, type) => {
    const details = await fetchDetails(item.id, type);
    return {
      id: item.id,
      title: type === "movie" ? item.title : item.name,
      original_title: type === "movie" ? item.original_title : item.original_name,
      original_language: item.original_language,
      vote_average: item.vote_average,
      poster_path: item.poster_path,
      media_type: type,
      genres: details.genres,
      cast: details.cast,
      overview: item.overview
    };
  };

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`);
        const { results } = await res.json();
        const normalizedMovies = await Promise.all(
          results.map((movie) => normalizeData(movie, "movie"))
        );
        setContents(normalizedMovies);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const [movieRes, tvRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=it-IT`),
          fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${api_key}&language=it-IT`)
        ]);

        const movieData = await movieRes.json();
        const tvData = await tvRes.json();

        setMovieGenres(movieData.genres);
        setTvGenres(tvData.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const searchContents = async () => {
    if (!searchText) return;

    try {
      const [movieRes, tvRes] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchText}`),
        fetch(`https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${searchText}`)
      ]);

      const movieData = await movieRes.json();
      const tvData = await tvRes.json();

      const normalizedMovies = await Promise.all(
        movieData.results.map(movie => normalizeData(movie, "movie"))
      );
      const normalizedTv = await Promise.all(
        tvData.results.map(tv => normalizeData(tv, "tv"))
      );

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
    movieGenres,
    tvGenres,
    selectedGenres,
    setSelectedGenres
  };

  return (
    <MoviesContext.Provider value={values}>{children}</MoviesContext.Provider>
  );
};

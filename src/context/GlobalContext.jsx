import { createContext, useContext, useState, useEffect } from "react";

const MoviesContext = createContext();

export const useMovies = () => useContext(MoviesContext);

export const MoviesProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [searchText, setSearchText] = useState('');

    const api_key = import.meta.env.VITE_MOVIE_DB_API_KEY;
    
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`)
            .then((res) => res.json())
            .then(({ results }) => {
                console.log(results);
                setMovies(results);
            });
    }, []); 

    const searchMovies = () => {
        if (!searchText) return;
        
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchText}`)
            .then((res) => res.json())
            .then(({ results }) => {
                setMovies(results);
            });
    };

    const values = {
        movies,
        searchText,
        setSearchText,
        searchMovies
    };

    return (
        <MoviesContext.Provider value={values}>
            {children}
        </MoviesContext.Provider>
    );
};
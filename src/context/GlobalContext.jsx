import { createContext, useContext, useEffect, useState } from "react";
const GlobalContext = createContext();


function GlobalContextProvider({children}) {
    const [movies, setMovies] = useState([]);

    const api_key = import.meta.env.VITE_MOVIE_DB_API_KEY;
   

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`)
            .then((res) => res.json())
            .then((data) => {
                setMovies(data.results);
            })
            .catch((err) => console.log(err));
          }, []);

          const values = {
            movies,
            setMovies}

    return (
        <GlobalContext.Provider value={{values}}>
            {children}
        </GlobalContext.Provider>
    )
    
}
  function useGlobalContext() {
            return useContext(GlobalContext);
        }
    
export { GlobalContextProvider, useGlobalContext };
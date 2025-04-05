import { useMovies } from "../context/GlobalContext";

function MoviesList() {
    const { movies, searchText, setSearchText } = useMovies();

    return (
        <div>
            <input 
                type="text" 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Cerca un film..."
            />
            <div>
                {movies.map((movie) => (
                    <div key={movie.id}>
                        <h2>{movie.title}</h2>
                        <p>{movie.overview}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MoviesList;

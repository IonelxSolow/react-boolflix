import { useMovies } from "../context/GlobalContext";

function MoviesList() {
    const { movies, searchText, setSearchText, searchMovies } = useMovies();

    const handleSubmit = (e) => {
        e.preventDefault();
        searchMovies();
    };

    return (
        <div className="container py-5">
            <form onSubmit={handleSubmit} className="row justify-content-center mb-4">
                <div className="col-md-6 d-flex gap-2">
                    <input 
                        type="text" 
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Cerca un film..."
                        className="form-control"
                    />
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                    >
                        Cerca
                    </button>
                </div>
            </form>

            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
                {movies.map((movie) => (
                    <div key={movie.id} className="col">
                        <div className="card h-100">
                         
                            <div className="card-body">
                                <h5 className="card-title">{movie.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{movie.original_title}</h6>
                                <p className="card-text">
                                    <small className="text-muted">
                                        Lingua: {movie.original_language}
                                        <br />
                                        Voto: {movie.vote_average}/10
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MoviesList;

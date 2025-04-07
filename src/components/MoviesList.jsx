import { useMovies } from "../context/GlobalContext";
import LanguageFlag from "./LanguageFlag";
import MoviePoster from "./MoviePoster";
import StarRating from "./StarRating";

function MoviesList() {
  const { contents } = useMovies();

  return (
    <div id="results-section" className="container py-5">
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
        {contents.map((item) => (
          <div key={item.id} className="col">
            <div className="card h-100">
              <MoviePoster 
                path={item.poster_path}
                title={item.title}
                size="medium"
              />
              <div className="card-body">
                <span className="badge bg-primary mb-2">
                  {item.media_type === "movie" ? "Film" : "Serie TV"}
                </span>
                <h5 className="card-title">{item.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {item.original_title}
                </h6>
                <p className="card-text">
                  <small className="text-muted">
                    Lingua: <LanguageFlag language={item.original_language} />
                    <br />
                    Voto: <StarRating vote={item.vote_average} />
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
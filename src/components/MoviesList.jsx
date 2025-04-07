import { useMovies } from "../context/GlobalContext";
import LanguageFlag from "./LanguageFlag";
import StarRating from "./StarRating";
import "./../styles/MoviesList.css";

function MoviesList() {
  const { contents } = useMovies();

  return (
    <div id="results-section" className="container py-5">
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
        {contents.map((item) => (
          <div key={item.id} className="col">
            <div
              className="movie-card"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w342${item.poster_path})`,
                height: '500px',
              }}
            >
              <div className="movie-info">
                <span className="badge bg-danger mb-2">
                  {item.media_type === "movie" ? "Film" : "Serie TV"}
                </span>
                <h5>{item.title}</h5>
                <h6>{item.original_title}</h6>
                <p>
                  <small>
                    Lingua: <LanguageFlag language={item.original_language} />
                    <br />
                    Voto: <StarRating vote={item.vote_average} />
                  </small>
                </p>
                <p className="overview">{item.overview}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoviesList;
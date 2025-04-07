import { useMovies } from "../context/GlobalContext";
import LanguageFlag from "./LanguageFlag";

function MoviesList() {
  const { contents, searchText, setSearchText, searchContents } = useMovies();

  const handleSubmit = (e) => {
    e.preventDefault();
    searchContents();
  };

  return (
    <div className="container py-5">
      <form onSubmit={handleSubmit} className="row justify-content-center mb-4">
        <div className="col-md-6 d-flex gap-2">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Cerca un film o una serie TV..."
            className="form-control"
          />
          <button type="submit" className="btn btn-primary">
            Cerca
          </button>
        </div>
      </form>

      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
        {contents.map((item) => (
          <div key={item.id} className="col">
            <div className="card h-100">
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
                    Voto: {item.vote_average}/10
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
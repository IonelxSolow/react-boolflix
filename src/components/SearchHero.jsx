import { useMovies } from "../context/GlobalContext";

function SearchHero() {
    const { searchText, setSearchText, searchContents } = useMovies();

    const handleSubmit = (e) => {
        e.preventDefault();
        searchContents();

        // Scroll automatico verso i risultati
        const resultsSection = document.getElementById("results-section");
        if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="hero-section position-relative" style={{
            backgroundImage: 'url(/bg-netflix-image.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
        }}>
            <div className="overlay position-absolute w-100 h-100" style={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)'
            }}></div>
            
            <div className="container position-relative h-100">
                <div className="row h-100 align-items-center text-center">
                    <div className="col-md-8 mx-auto">
                        <a href="/" className="d-inline-block mb-4">
                            <img 
                                src="/BoolflixLogo.png" 
                                alt="Boolflix Logo" 
                                style={{ maxWidth: "400px" }}
                            />
                        </a>
                        <h1 className="display-4 text-white mb-4">
                            Film, serie TV e tanto altro, senza limiti
                        </h1>
                        <form onSubmit={handleSubmit} className="d-flex gap-2 justify-content-center">
                            <input
                                type="text"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder="Cerca un film o una serie TV..."
                                className="form-control form-control-lg w-75"
                            />
                            <button type="submit" className="btn btn-danger btn-lg">
                                Cerca
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchHero;

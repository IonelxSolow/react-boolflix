import { useMovies } from "../context/GlobalContext";

function GenreFilter() {
    const { movieGenres, tvGenres, selectedGenres, setSelectedGenres, contents } = useMovies();

    // Ottieni tutti i generi presenti nei contenuti attuali
    const activeGenres = [...new Set(contents.flatMap(item => 
        item.genres ? item.genres.split(", ") : []
    ))];

    // Filtra i generi che sono effettivamente presenti nei contenuti
    const availableGenres = [...movieGenres, ...tvGenres]
        .filter((genre, index, self) => 
            index === self.findIndex(g => g.id === genre.id) && // rimuovi duplicati
            activeGenres.includes(genre.name) // mantieni solo i generi attivi
        );

    const handleGenreToggle = (genreId) => {
        setSelectedGenres(prev => 
            prev.includes(genreId)
                ? prev.filter(id => id !== genreId)
                : [...prev, genreId]
        );
        
        // Scroll automatico verso i risultati
        const resultsSection = document.getElementById("results-section");
        if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="container mb-4">
            <div className="row">
                <div className="col">
                    <h5 className="text-danger mb-3">Filtra per genere:</h5>
                    <div className="d-flex flex-wrap gap-2">
                        {availableGenres.map(genre => (
                            <button
                                key={genre.id}
                                className={`btn btn-sm ${
                                    selectedGenres.includes(genre.id)
                                        ? 'btn-danger'
                                        : 'btn-outline-danger'
                                }`}
                                onClick={() => handleGenreToggle(genre.id)}
                            >
                                {genre.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GenreFilter;

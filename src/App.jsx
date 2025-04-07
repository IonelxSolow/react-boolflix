import { MoviesProvider } from "./context/GlobalContext";
import SearchHero from "./components/SearchHero";
import MoviesList from "./components/MoviesList";

function App() {
    return (
        <MoviesProvider>
            <div className="bg-dark min-vh-100">
                <SearchHero />
                <MoviesList />
            </div>
        </MoviesProvider>
    );
}

export default App;

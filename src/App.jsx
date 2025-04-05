import { MoviesProvider } from "./context/GlobalContext";
import MoviesList from "./components/MoviesList";

function App() {
    return (
        <MoviesProvider>
            <div>
                <MoviesList />
            </div>
        </MoviesProvider>
    )
}

export default App;














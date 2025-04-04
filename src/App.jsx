import './App.css';
import { GlobalContextProvider } from './context/GlobalContext.jsx';
import SearchBar from './components/SearchBar';

function App() {
  const handleSearch = (query) => {
    console.log('Searching for:', query);
    
    function handleSearch(e) {
      e.preventDefault();
      onSearch(searchQuery);
    }

  };

  return (
    <GlobalContextProvider>
      <div className="app-container">
        <h1>React-Boolflix</h1>
        <SearchBar onSearch={handleSearch} />
      </div>
    </GlobalContextProvider>
  );
}

export default App;

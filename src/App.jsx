import './App.css';
import { GlobalProvider } from './context/GlobalContext';

function App() {
  return (
    <GlobalProvider>
      <>
        <h1>React Boolflix</h1>
      </>
    </GlobalProvider>
  );
}

export default App;

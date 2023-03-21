import "normalize.css";
import "./App.css";
import { Navigation } from "./components/Navigation/Navigation";
import { Main } from "./Main";
function App() {
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0"
      />
      <Navigation />
    </div>
  );
}

export default App;

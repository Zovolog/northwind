import "normalize.css";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Navbar } from "./components/Navbar/Navbar";
import { Main } from "./components/Main/Main";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Suppliers } from "./components/Suppliers/Suppliers";
import { Search } from "./components/Search/Search";
import { Supplier } from "./components/Supplier/Supplier";
function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/search" element={<Search />} />
            <Route path="/suppliers/:userSupplierID" element={<Supplier />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;

import "normalize.css";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Navbar } from "./components/Navbar/Navbar";
import { Main } from "./components/Main/Main";
import { Route, Routes } from "react-router-dom";
import { Suppliers } from "./components/Suppliers/Suppliers";
import { Search } from "./components/Search/Search";
import { Supplier } from "./components/Supplier/Supplier";
import { Products } from "./components/Products/Products";
import { Product } from "./components/Product/Product";
import { Employees } from "./components/Employees/Employees";
import { Employee } from "./components/Employee/Employee";
import { Customers } from "./components/Customers/Customers";
function App() {
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0"
      />
      <Navbar />
      <div className="main">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/suppliers/:userSupplierID" element={<Supplier />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<Product />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/:employeeID" element={<Employee />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:customerID" element={<Customers />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;

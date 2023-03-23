import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Customer } from "./components/Customer/Customer";
import { Customers } from "./components/Customers/Customers";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Employee } from "./components/Employee/Employee";
import { Employees } from "./components/Employees/Employees";
import { Home } from "./components/Home/Home";
import { Order } from "./components/Order/Order";
import { Orders } from "./components/Orders/Orders";
import { Product } from "./components/Product/Product";
import { Products } from "./components/Products/Products";
import { Search } from "./components/Search/Search";
import { Supplier } from "./components/Supplier/Supplier";
import { Suppliers } from "./components/Suppliers/Suppliers";

interface logs {
  resultCount: number;
  dash: any;
  handleDashChange: any;
  resCount: any;
}

export const Logs = createContext({} as logs);

export const Main: React.FC = () => {
  const [dash, setDash] = useState([]);
  const [resultCount, setResultsCount] = useState(0);

  const handleDashChange = (newState: any) => {
    setDash(newState);
  };

  const resCount = (newState: any) => {
    setResultsCount(newState);
  };
  return (
    <div className="main-content">
      <Logs.Provider value={{ dash, handleDashChange, resultCount, resCount }}>
        <Routes>
          <Route
            path="/dash"
            element={<Dashboard dash={dash} resultCount={resultCount} />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/suppliers/:userSupplierID" element={<Supplier />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<Product />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderID" element={<Order />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/:employeeID" element={<Employee />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:customerID" element={<Customer />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Logs.Provider>
    </div>
  );
};

import { Route, Routes } from "react-router-dom";
import { Customer } from "./components/Customer/Customer";
import { Customers } from "./components/Customers/Customers";
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

export const Main: React.FC = () => {
  return (
    <div className="main-content">
      <Routes>
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
    </div>
  );
};

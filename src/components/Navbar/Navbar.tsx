import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar: React.FC = () => {
  return (
    <div className="navigation-column">
      <div className="navigation-logo">
        <p>
          <span style={{ fontWeight: 900 }}>Northwind</span> Traders
        </p>
      </div>
      <div className="navigation-block">
        <ul className="navigation-block-list">
          <li className="navigation-block-list-header">
            <p style={{ marginLeft: "10px" }}>GENERAL</p>
          </li>
          <Link to={"/"}>
            <li className="navigation-block-list-link">
              <span className="material-symbols-outlined icon">home</span>
              Home
            </li>
          </Link>
          <li className="navigation-block-list-link">
            <span className="material-symbols-outlined icon">
              display_settings
            </span>
            Dashboard
          </li>
          <li className="navigation-block-list-header">
            <p style={{ marginLeft: "10px" }}>BACKOFFICE</p>
          </li>
          <Link to={"/suppliers"}>
            <li className="navigation-block-list-link">
              <span className="material-symbols-outlined icon">
                inventory_2
              </span>
              Suppliers
            </li>
          </Link>
          <Link to={"/products"}>
            <li className="navigation-block-list-link">
              <span className="material-symbols-outlined icon">
                production_quantity_limits
              </span>
              Products
            </li>
          </Link>
          <li className="navigation-block-list-link">
            <span className="material-symbols-outlined icon">
              shopping_cart
            </span>
            Orders
          </li>
          <Link to={"/employees"}>
            <li className="navigation-block-list-link">
              <span className="material-symbols-outlined icon">badge</span>
              Employees
            </li>
          </Link>
          <Link to={"/customers"}>
            <li className="navigation-block-list-link">
              <span className="material-symbols-outlined icon">group</span>
              Customers
            </li>
          </Link>

          <Link to={"/search"}>
            <li className="navigation-block-list-link">
              <span className="material-symbols-outlined icon">search</span>
              Search
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

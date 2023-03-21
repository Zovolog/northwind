import React from "react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Main } from "../../Main";
import "./Navigation.css";

export const Navigation: React.FC = () => {
  const listBody = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLDivElement>(null);
  const [date, setDate] = useState(new Date());
  const navbar = useRef<HTMLDivElement>(null);

  function refreshClock() {
    setDate(new Date());
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  const openList = () => {
    listBody.current?.classList.toggle("opened");
    button.current?.classList.toggle("opened-bt");
  };

  return (
    <div className="navigation">
      <div className="navigation-column" ref={navbar}>
        <div className="navigation-logo">
          <p>
            <span style={{ fontWeight: 900 }}>Northwind</span> Traders
          </p>
        </div>
        <div className="navigation-block">
          <ul className="navigation-block-list">
            <li className="navigation-block-list-header">
              <p>GENERAL</p>
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
              <p>BACKOFFICE</p>
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
            <Link to={"/orders"}>
              <li className="navigation-block-list-link">
                <span className="material-symbols-outlined icon">
                  shopping_cart
                </span>
                Orders
              </li>
            </Link>
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
      <div className="main">
        <header>
          <span
            className="icon-media material-symbols-outlined"
            onClick={(e) => {
              navbar.current?.classList.toggle("navigation-column");
              navbar.current?.classList.toggle(
                "navigation-column-opened"
              );
            }}
          >
            menu
          </span>
          <span className="icon-media material-symbols-outlined">
            more_vert
          </span>
          <p className="clock">{date.toLocaleTimeString()}</p>
          <div className="dropdown-links">
            <div
              className="dropdown-list-header"
              onClick={openList}
              ref={button}
            >
              <span className="material-symbols-outlined">menu</span>
              <p className="dropdown-list-header-logo">
                SQLite Links
                <span className="material-symbols-outlined arrow-down">
                  keyboard_arrow_down
                </span>
              </p>
            </div>
            <div className="dropdown-list-body" ref={listBody}>
              <a
                href="https://blog.cloudflare.com/introducing-d1/"
                className="dropdown-list-item"
              >
                <span className="material-symbols-outlined">link</span>
                <p style={{ marginLeft: "10px" }}>Introducing D1</p>
              </a>
              <a
                href="https://www.sqlite.org/lang.html"
                className="dropdown-list-item"
              >
                <span className="material-symbols-outlined">link</span>
                <p style={{ marginLeft: "10px" }}> SQLite SQL Flavour</p>
              </a>
              <a
                href="https://developers.cloudflare.com/workers/learning/using-durable-objects/"
                className="dropdown-list-item"
              >
                <span className="material-symbols-outlined">link</span>
                <p style={{ marginLeft: "10px" }}>Durable Objects</p>
              </a>
            </div>
          </div>
        </header>
        <Main />
      </div>
    </div>
  );
};

import React, { createContext } from "react";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
const ThemeContext = createContext(null);
import "./Header.css";

export const Header: React.FC = () => {
  const listBody = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLDivElement>(null);
  const [date, setDate] = useState(new Date());

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
    <div>
      <header>
        <span
          className="icon-media material-symbols-outlined"
          onClick={(e) => React.createContext(false)}
        >
          menu
        </span>
        <span className="icon-media material-symbols-outlined">more_vert</span>
        <p className="clock">{date.toLocaleTimeString()}</p>
        <div className="dropdown-links">
          <div className="dropdown-list-header" onClick={openList} ref={button}>
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
    </div>
  );
};

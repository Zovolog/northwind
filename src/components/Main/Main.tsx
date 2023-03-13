import "./Main.css";
import logo from "./public.png";
export const Main: React.FC = () => {
  return (
    <div className="main-page">
      <div className="main-page-content">
        <p className="main-page-content-welcome">
          Welcome to Northwind Traders
        </p>
        <p className="main-page-content-welcome-under">
          Running on Cloudflare's D1
        </p>
        <div className="main-page-content-container">
          <div className="main-page-content-container-text-block">
            <p className="main-page-content-text">
              This is a demo of the Northwind dataset, running on{" "}
              <a
                href="https://workers.cloudflare.com/"
                target="_blank"
                className="main-text-link"
              >
                Cloudflare Workers
              </a>
              , and D1 - Cloudflare's newest SQL database, running on SQLite.
            </p>
            <p className="main-page-content-text">
              Read our{" "}
              <a
                href="https://blog.cloudflare.com/introducing-d1/"
                target="_blank"
                className="main-text-link"
              >
                D1 announcement
              </a>{" "}
              to learn more about D1.
            </p>
            <p className="main-page-content-text">
              This dataset was sourced from{" "}
              <a
                href="https://github.com/jpwhite3/northwind-SQLite3"
                target="_blank"
                className="main-text-link"
              >
                D1 announcement
              </a>
              .
            </p>
            <p className="main-page-content-text">
              You can use the UI to explore Supplies, Orders, Customers,
              Employees and Products, or you can use search if you know what
              you're looking for.
            </p>
          </div>
          <img src={logo} className="main-logo" />
        </div>
      </div>
    </div>
  );
};

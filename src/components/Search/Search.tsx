import "./Search.css";

export const Search: React.FC = () => {
  return (
    <div className="info-wrapper">
      <div className="info-container">
        <p className="info-name">Search Database</p>
        <input type={"text"} placeholder="Enter keyword..." />
        <p className="info-name-search">Tables</p>
        <div className="checkbox-wrapper">
          <label>
            Customers
            <input
              type="radio"
              className="modern-radio"
              value="1"
              name="a"
              checked
            />
            <span></span>
          </label>
          <label style={{ marginLeft: "1rem" }} className="whole-radio-button">
            Products
            <input type="radio" className="modern-radio" value="2" name="a" />
            <span></span>
          </label>
        </div>
        <p className="info-name-search">Search results</p>
      </div>
    </div>
  );
};

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Search.css";

export const Search: React.FC = () => {
  const [option, getOption] = useState("products");
  const [key, getKey] = useState("");
  const [data, getData] = useState([]);
  function request(item: string, key: string) {
    axios
      .get(`https://northwind.onrender.com/search-${item}/${key}`)
      .then(function (response) {
        console.log(response.data.data);
        getData(response.data.data);
      })
      .catch(function (error) {
        getData([]);
        console.log(data);
      });
  }
  useEffect(() => {
    if (key) {
      request(option, key);
    }
  }, [option]);
  return (
    <div className="info-wrapper">
      <div className="info-container">
        <p className="info-name">Search Database</p>
        <div className="search-block">
          <input
            type={"text"}
            placeholder="Enter keyword..."
            className="input-search"
            onKeyDown={(ev) => {
              if (ev.keyCode == 13 && option && key) {
                console.log("Enter press");
                request(option, key);
              }
            }}
            onChange={(e) => {
              getKey(e.target.value);
            }}
          />
          <span className="material-symbols-outlined search-icon">search</span>
        </div>

        <p className="info-name-search">Tables</p>
        <div className="checkbox-wrapper">
          <label>
            Products
            <input
              type="radio"
              className="modern-radio"
              value="Products"
              name="a"
              defaultChecked
              onChange={(e) => getOption(e.target.value)}
            />
            <span></span>
          </label>
          <label style={{ marginLeft: "1rem" }} className="whole-radio-button">
            Customers
            <input
              type="radio"
              className="modern-radio"
              value="customers"
              name="a"
              onChange={(e) => getOption(e.target.value)}
            />
            <span></span>
          </label>
        </div>
        <p className="info-name-search">Search results</p>
        <div className="search-results">
          {data.length === 0 ? (
            <p>No result</p>
          ) : (
            <div>
              {option === "products" ? (
                <div>
                  {" "}
                  {data.map((product: any) => (
                    <div key={product.productID}>
                      <Link to={`/products/${product.productID}`}>
                        <p className="link">{product.productName}</p>
                      </Link>
                      <p className="info">
                        #{1}, Quantity Per Unit:{product.quantityPerUnit},
                        Price:{product.unitPrice}, Stock:{product.unitsInStock}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>custom</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

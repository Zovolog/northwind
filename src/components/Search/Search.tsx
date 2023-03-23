import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Logs } from "../../Main";
import "./Search.css";

export const Search: React.FC = () => {
  const [option, getOption] = useState("products");
  const [key, getKey] = useState("");
  const [data, getData] = useState([]);

  const { handleDashChange, resCount } = useContext(Logs);

  function request(item: string, key: string) {
    axios
      .get(`https://northwind.onrender.com/search-${item}/${key}`)
      .then(function (response) {
        console.log(response.data);
        getData(response.data.data);
        handleDashChange((prevState: any) => {
          const updateDash = [response.data.info, ...prevState];
          return updateDash;
        });
        resCount((prevState: number) => {
          return response.data.data.length + prevState;
        });
      })
      .catch(function (error) {
        getData([]);
      });
  }

  useEffect(() => {
    if (key) {
      request(option, key);
    }
  }, [option]);

  return (
    <div className="info-wrapper">
      <div className="info-container-search">
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
              value="products"
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
                  {data.map((product: any, index) => (
                    <div key={product.productID}>
                      <Link to={`/products/${product.productID}`}>
                        <p className="link">{product.productName}</p>
                      </Link>
                      <p className="info">
                        #{index + 1}, Quantity Per Unit:
                        {product.quantityPerUnit}, Price:{product.unitPrice},
                        Stock:{product.unitsInStock}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {" "}
                  {data.map((customer: any, index) => (
                    <div key={customer.customerID}>
                      <Link to={`/products/${customer.customerID}`}>
                        <p className="link">{customer.companyName}</p>
                      </Link>
                      <p className="info">
                        #{index + 1}, Contact: {customer.contactName}, Title:{" "}
                        {customer.contactTitle}, Phone: {customer.phone}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

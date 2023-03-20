import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

interface order {
  customerID: string;
  shipName: string;
  totalProductsItems: string;
  totalProductsQuantity: string;
  totalProductPrice: string;
  totalProductDiscount: string;
  companyName: string;
  freight: string;
  orderDate: string;
  requiredDate: string;
  shippedDate: string;
  shipCity: string;
  shipRegion: string;
  shipPostalCode: string;
  shipCountry: string;
}

export const Order: React.FC = () => {
  const { orderID } = useParams();
  const [data, getData] = useState<order | null>(null);
  const [productList, getproductList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://northwind.onrender.com/orders/${orderID}`)
      .then(function (response) {
        console.log(response.data);
        getData(response.data.order.data);
        getproductList(response.data.productsInOrder.data);
      })
      .catch(function (error) {});
  }, []);
  return (
    <div>
      <div className="info-wrapper">
        <div className="info-container">
          <div className="info-header">
            <p className="info-name">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "1.4rem", marginRight: "0.5rem" }}
              >
                ballot
              </span>
              Order information
            </p>
          </div>
          {data ? (
            <div>
              <div className="info-body-user">
                <div className="info-body-user-text-block">
                  <p className="info-body-header">Customer Id</p>
                  <Link to={`/customers/${data.customerID}`} className="link">
                    <p>{data.customerID}</p>
                  </Link>
                  <p className="info-body-header">Ship Name</p>
                  <p>{data.shipName}</p>
                  <p className="info-body-header">Total Products</p>
                  <p>{data.totalProductsQuantity}</p>
                  <p className="info-body-header">Total Quantity</p>
                  <p>{data.totalProductsItems}</p>
                  <p className="info-body-header">Total Price</p>
                  <p>${data.totalProductPrice}</p>
                  <p className="info-body-header">Total Discount</p>
                  <p>${data.totalProductsQuantity}</p>
                  <p className="info-body-header">Ship Via</p>
                  <p>{data.shipName}</p>
                  <p className="info-body-header">Freight</p>
                  <p>${data.freight}</p>
                </div>
                <div className="info-body-user-text-block">
                  <p className="info-body-header">Order Date</p>
                  <p>{data.orderDate.slice(0, 10)}</p>
                  <p className="info-body-header">Required Date</p>
                  <p>{data.orderDate.slice(0, 10)}</p>
                  <p className="info-body-header">Shipped Date</p>
                  <p>{data.shippedDate.slice(0, 10)}</p>
                  <p className="info-body-header">Ship City</p>
                  <p>{data.shipCity}</p>
                  <p className="info-body-header">Ship Region</p>
                  <p>{data.shipRegion}</p>
                  <p className="info-body-header">Ship Postal Code</p>
                  <p>{data.shipPostalCode}</p>
                  <p className="info-body-header">Ship Country</p>
                  <p>{data.shipCountry}</p>
                </div>
              </div>
              <div className="info-body">
                <table>
                  <thead>
                    <tr>
                      <th style={{ fontWeight: 700 }}>Product</th>
                      <th style={{ fontWeight: 700 }}>Quantity</th>
                      <th style={{ fontWeight: 700 }}>Order Price</th>
                      <th style={{ fontWeight: 700 }}>Total Price</th>
                      <th style={{ fontWeight: 700 }}>Discount</th>{" "}
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map((product: any) => (
                      <tr
                        key={product.productID}
                        className={
                          product.productID % 2 === 0
                            ? "dark-elem"
                            : "light-elem"
                        }
                      >
                        <th>
                          {" "}
                          <Link
                            to={`/products/${product.productID}`}
                            className="link"
                          >
                            {product.productName}
                          </Link>
                        </th>
                        <th>{product.quantity}</th>
                        <th>{product.unitPrice}</th>
                        <th>{product.totalProductPrice}</th>
                        <th>{product.discount}%</th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>No such product</div>
          )}
          <div className="info-footer-user">
            <button className="bt-return" onClick={() => navigate("/orders")}>
              Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
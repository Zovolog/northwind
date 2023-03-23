import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Pagination, Stack } from "@mui/material";
import { Logs } from "../../Main";

export const Orders: React.FC = (props) => {
  const [data, getData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);

  const baseUrl = "https://northwind.onrender.com/orders";

  const { handleDashChange, resCount } = useContext(Logs);
  useEffect(() => {
    axios
      .get(baseUrl + `?page=${page}`)
      .then(function (response) {
        console.log(response.data);
        getData(response.data.orders.data);
        setPageQty(Math.ceil(response.data.count.data / 20));

        handleDashChange((prevState: any) => {
          const updateDash = [
            response.data.count.info,
            response.data.orders.info,
            ...prevState,
          ];
          return updateDash;
        });
        resCount((prevState: number) => {
          return response.data.orders.data.length + 1 + prevState;
        });
      })
      .catch(function (error) {});
  }, [page]);
  return (
    <div>
      <div className="info-wrapper">
        {data.length === 0 ? (
          <p>Loading orders...</p>
        ) : (
          <div className="info-container">
            <div className="info-header">
              <p className="info-name">Orders</p>
              <span className="material-symbols-outlined">redo</span>
            </div>
            <div className="info-body">
              <table>
                <thead>
                  <tr>
                    <th style={{ fontWeight: 700 }}>Id</th>
                    <th style={{ fontWeight: 700 }}>Total Price</th>
                    <th style={{ fontWeight: 700 }}>Products</th>
                    <th style={{ fontWeight: 700 }}>Quantity</th>
                    <th style={{ fontWeight: 700 }}>Date</th>
                    <th style={{ fontWeight: 700 }}>Name</th>
                    <th style={{ fontWeight: 700 }}>City</th>
                    <th style={{ fontWeight: 700 }}>Country</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((order: any) => (
                    <tr
                      key={order.orderID}
                      className={
                        order.orderID % 2 === 0 ? "dark-elem" : "light-elem"
                      }
                    >
                      <th>
                        {" "}
                        <Link to={`/orders/${order.orderID}`} className="link">
                          {order.orderID}
                        </Link>
                      </th>
                      <th>{order.totalProductPrice}</th>
                      <th>{order.totalProductsQuantity}</th>
                      <th>{order.totalProductsItems}</th>
                      <th>{order.shippedDate.slice(0, 10)}</th>
                      <th>{order.shipName}</th>
                      <th>{order.shipCity}</th>
                      <th>{order.shipCountry}</th>
                      <th></th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="info-footer">
              <Container>
                <Stack spacing={2}>
                  {!!pageQty && (
                    <Pagination
                      count={pageQty}
                      page={page}
                      onChange={(_, num) => setPage(num)}
                      hidePrevButton
                      hideNextButton
                      variant="outlined"
                      shape="rounded"
                      defaultPage={1}
                      siblingCount={2}
                      boundaryCount={2}
                      size="large"
                    />
                  )}
                </Stack>
              </Container>
              <p className="whatPage">
                Page {page} of {pageQty}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

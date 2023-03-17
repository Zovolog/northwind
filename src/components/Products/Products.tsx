import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Pagination, Stack } from "@mui/material";

export const Products: React.FC = (props) => {
  const [data, getData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);
  const baseUrl = "https://northwind.onrender.com/products";
  useEffect(() => {
    axios
      .get(baseUrl + `?page=${page}`)
      .then(function (response) {
        console.log(response.data);
        console.log(response.data);
        getData(response.data.products.data);
        setPageQty(Math.ceil(response.data.count.data / 20));
      })
      .catch(function (error) {});
  }, [page]);
  return (
    <div>
      <div className="info-wrapper">
        {data.length === 0 ? (
          <p>Loadins products...</p>
        ) : (
          <div className="info-container">
            <div className="info-header">
              <p className="info-name">Products</p>
              <span className="material-symbols-outlined">redo</span>
            </div>
            <div className="info-body">
              <table>
                <thead>
                  <tr>
                    <th style={{ fontWeight: 700 }}>Name</th>
                    <th style={{ fontWeight: 700 }}>Qt per unit</th>
                    <th style={{ fontWeight: 700 }}>Price</th>
                    <th style={{ fontWeight: 700 }}>Stock</th>
                    <th style={{ fontWeight: 700 }}>Orders</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user: any) => (
                    <tr
                      key={user.productID}
                      className={
                        user.productID % 2 != 0 ? "dark-elem" : "light-elem"
                      }
                    >
                      <th>
                        <Link
                          to={`/products/${user.productID}`}
                          className="link"
                        >
                          {user.productName}
                        </Link>
                      </th>

                      <th>{user.quantityPerUnit}</th>
                      <th>${user.unitPrice}</th>
                      <th>{user.unitsInStock}</th>
                      <th>{user.unitsOnOrder}</th>
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

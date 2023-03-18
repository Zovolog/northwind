import { Container, Pagination, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Customers: React.FC = (props) => {
  const [data, getData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);
  const baseUrl = "https://northwind.onrender.com/customers";

  useEffect(() => {
    axios
      .get(baseUrl + `?page=${page}`)
      .then(function (response) {
        console.log(response.data);
        getData(response.data.customers.data);
        setPageQty(Math.ceil(response.data.count.data / 20));
      })
      .catch(function (error) {});
  }, [page]);
  return (
    <div>
      <div className="info-wrapper">
        {data.length === 0 ? (
          <p>Loadins customers...</p>
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
                    <th></th>
                    <th style={{ fontWeight: 700 }}>Company</th>
                    <th style={{ fontWeight: 700 }}>Contact</th>
                    <th style={{ fontWeight: 700 }}>Title</th>
                    <th style={{ fontWeight: 700 }}>City</th>
                    <th style={{ fontWeight: 700 }}>Country</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((customer: any) => (
                    <tr
                      key={customer.customerID}
                      className={
                        customer.productID % 2 != 0 ? "dark-elem" : "light-elem"
                      }
                    >
                      <th>
                        <img
                          src={`https://api.dicebear.com/5.x/initials/svg?seed=${customer.companyName}`}
                          className="name-icons"
                        />
                      </th>

                      <th>
                        <Link
                          to={`/customers/${customer.customerID}`}
                          className="link"
                        >
                          {customer.companyName}
                        </Link>
                      </th>
                      <th>{customer.contactName}</th>
                      <th>{customer.contactTitle}</th>
                      <th>{customer.city}</th>
                      <th>{customer.country}</th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="info-footer">
              {pageQty > 1 ? (
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
              ) : (
                <div></div>
              )}

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

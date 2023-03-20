import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Pagination, Stack } from "@mui/material";

export const Suppliers: React.FC = (props) => {
  const [data, getData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);
  const baseUrl = "https://northwind.onrender.com/suppliers";

  useEffect(() => {
    axios
      .get(baseUrl + `?page=${page}`)
      .then(function (response) {
        console.log(response.data);
        getData(response.data.suppliers.data);
        setPageQty(Math.ceil(response.data.count.data / 20));
      })
      .catch(function (error) {});
  }, [page]);

  return (
    <div>
      <div className="info-wrapper">
        {data.length === 0 ? (
          <p>Loading suppliers...</p>
        ) : (
          <div className="info-container">
            <div className="info-header">
              <p className="info-name">Suppliers</p>
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
                  {data.map((user: any) => (
                    <tr
                      key={user.supplierID}
                      className={
                        user.supplierID % 2 != 0 ? "dark-elem" : "light-elem"
                      }
                    >
                      <th>
                        <img
                          src={`https://api.dicebear.com/5.x/initials/svg?seed=${user.contactName}`}
                          className="name-icons"
                        />
                      </th>
                      <th>
                        <Link
                          to={`/suppliers/${user.supplierID}`}
                          className="link"
                        >
                          {user.companyName}
                        </Link>
                      </th>
                      <th>{user.contactName}</th>
                      <th>{user.contactTitle}</th>
                      <th>{user.city}</th>
                      <th>{user.country}</th>
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

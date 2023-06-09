import { Container, Pagination, Stack } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Logs } from "../../Main";
import redo from "../../redo.svg";

export const Employees: React.FC = (props) => {
  const [data, getData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);
  const baseUrl = "https://northwind.onrender.com/employees";

  const { handleDashChange, resCount } = useContext(Logs);

  useEffect(() => {
    axios
      .get(baseUrl + `?page=${page}`)
      .then(function (response) {
        console.log(response.data);
        getData(response.data.employees.data);
        setPageQty(Math.ceil(response.data.count.data / 20));
        handleDashChange((prevState: any) => {
          const updateDash = [
            response.data.count.info,
            response.data.employees.info,
            ...prevState,
          ];
          return updateDash;
        });

        resCount((prevState: number) => {
          return response.data.employees.data.length + 1 + prevState;
        });
      })
      .catch(function (error) {});
  }, [page]);
  return (
    <div>
      <div className="info-wrapper">
        {data.length === 0 ? (
          <p>Loading employees...</p>
        ) : (
          <div className="info-container">
            <div className="info-header">
              <p className="info-name">Employees</p>
              <img src={redo} />
            </div>
            <div className="info-body">
              <div className="desktop-table">
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th style={{ fontWeight: 700 }}>Name</th>
                      <th style={{ fontWeight: 700 }}>Title</th>
                      <th style={{ fontWeight: 700 }}>City</th>
                      <th style={{ fontWeight: 700 }}>Phone</th>
                      <th style={{ fontWeight: 700 }}>Country</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((employee: any) => (
                      <tr
                        key={employee.employeeID}
                        className={
                          employee.employeeID % 2 != 0
                            ? "dark-elem"
                            : "light-elem"
                        }
                      >
                        <th>
                          <img
                            src={`https://api.dicebear.com/5.x/initials/svg?seed=${
                              employee.firstName + " " + employee.lastName
                            }`}
                            className="name-icons"
                          />
                        </th>

                        <th>
                          <Link
                            to={`/employees/${employee.employeeID}`}
                            className="link"
                          >
                            {employee.firstName + " " + employee.lastName}
                          </Link>
                        </th>
                        <th>{employee.title}</th>
                        <th>{employee.city}</th>
                        <th>{employee.homePhone}</th>
                        <th>{employee.country}</th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mobile-table">
                <table>
                  <tbody>
                    {data.map((employee: any) => (
                      <tr key={employee.employeeID}>
                        <td className="image-row">
                          <img
                            src={`https://api.dicebear.com/5.x/initials/svg?seed=${
                              employee.firstName + " " + employee.lastName
                            }`}
                            className="big-icon"
                          />
                        </td>

                        <td>
                          <span className="text-weight">Name</span>
                          <Link
                            to={`/employees/${employee.employeeID}`}
                            className="link"
                          >
                            {employee.firstName + " " + employee.lastName}
                          </Link>
                        </td>
                        <td>
                          <span className="text-weight">Title</span>
                          {employee.title}
                        </td>
                        <td>
                          <span className="text-weight">City</span>
                          {employee.city}
                        </td>
                        <td>
                          <span className="text-weight">Phone</span>
                          {employee.homePhone}
                        </td>
                        <td>
                          <span className="text-weight">Country</span>
                          {employee.country}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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

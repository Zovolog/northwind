import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Logs } from "../../Main";

interface employee {
  firstName: string;
  lastName: string;
  title: string;
  titleOfCourtesy: string;
  birthDate: string;
  hireDate: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  homePhone: string;
  extension: string;
  notes: string;
  reportsTo: number;
}
export const Employee: React.FC = () => {
  const { employeeID } = useParams();
  const [data, getData] = useState<employee | null>(null);
  const [nameReporter, getnameReporter] = useState("");
  const navigate = useNavigate();

  const { handleDashChange, resCount } = useContext(Logs);
  useEffect(() => {
    axios
      .get(`https://northwind.onrender.com/employees/${employeeID}`)
      .then(function (response) {
        console.log(response.data);
        getData(response.data.employee.data.employees);

        getnameReporter("");

        getnameReporter(
          response.data.employee.data.reportsToTable.firstName +
            " " +
            response.data.employee.data.reportsToTable.lastName
        );
        handleDashChange((prevState: any) => {
          const updateDash = [response.data.employee.info, ...prevState];
          return updateDash;
        });
        resCount((prevState: number) => {
          return 1 + prevState;
        });
      })
      .catch(function (error) {});
  }, [employeeID]);

  return (
    <div>
      <div className="info-wrapper">
        {data ? (
          <div className="info-container">
            <div className="info-header">
              <p className="info-name">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "1.4rem", marginRight: "0.5rem" }}
                >
                  ballot
                </span>
                Employee information
              </p>
            </div>

            <div className="info-body-user">
              <div className="info-body-user-text-block">
                <p className="info-body-header">Name</p>
                <p>{data.firstName + " " + data.lastName}</p>
                <p className="info-body-header">Title</p>
                <p>{data.title}</p>
                <p className="info-body-header">Title Of Courtesy</p>
                <p>{data.titleOfCourtesy}</p>
                <p className="info-body-header">Birth Date</p>
                <p>{data.birthDate}</p>
                <p className="info-body-header">Hire Date</p>
                <p>{data.hireDate}</p>
                <p className="info-body-header">Address</p>
                <p>{data.address}</p>
                <p className="info-body-header">City</p>
                <p>{data.city}</p>
              </div>
              <div className="info-body-user-text-block">
                <p className="info-body-header">Postal Code</p>
                <p>{data.postalCode}</p>
                <p className="info-body-header">Country</p>
                <p>{data.country}</p>
                <p className="info-body-header">Home Phone</p>
                <p>{data.country}</p>
                <p className="info-body-header">Extension</p>
                <p>{data.extension}</p>
                <p className="info-body-header">Notes</p>
                <p>{data.notes}</p>

                {nameReporter ? (
                  <div>
                    <p className="info-body-header">Reports To</p>

                    <Link to={`/employees/${data.reportsTo}`} className="link">
                      <p>{nameReporter}</p>
                    </Link>
                  </div>
                ) : (
                  <p></p>
                )}
              </div>
            </div>

            <div className="info-footer-user">
              <button
                className="bt-return"
                onClick={() => navigate("/employees")}
              >
                Go back
              </button>
            </div>
          </div>
        ) : (
          <div>No such product</div>
        )}
      </div>
    </div>
  );
};

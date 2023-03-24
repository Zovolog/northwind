import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Logs } from "../../Main";

interface customer {
  companyName: string;
  contactName: string;
  contactTitle: string;
  address: string;
  city: string;
  postalCode: string;
  region: string;
  country: string;
  phone: string;
  fax: string;
}

export const Customer: React.FC = () => {
  const { customerID } = useParams();
  const [data, getData] = useState<customer | null>(null);
  const navigate = useNavigate();

  const { handleDashChange, resCount } = useContext(Logs);
  useEffect(() => {
    axios
      .get(`https://northwind.onrender.com/customers/${customerID}`)
      .then(function (response) {
        getData(response.data.customer.data);
        console.log(response.data);
        handleDashChange((prevState: any) => {
          const updateDash = [response.data.customer.info, ...prevState];
          return updateDash;
        });
        resCount((prevState: number) => {
          return 1 + prevState;
        });
      })
      .catch(function (error) {});
  }, []);

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
                Customer information
              </p>
            </div>

            <div className="info-body-user">
              <div className="info-body-user-text-block">
                <p className="info-body-header">Company Name</p>
                <p>{data.companyName}</p>
                <p className="info-body-header">Contact Name</p>
                <p>{data.contactName}</p>
                <p className="info-body-header">Contact Title</p>
                <p>{data.contactTitle}</p>
                <p className="info-body-header">Address</p>
                <p>{data.address}</p>
                <p className="info-body-header">City</p>
                <p>{data.city}</p>
              </div>
              <div className="info-body-user-text-block">
                <p className="info-body-header">Postal Code</p>
                <p>{data.postalCode}</p>
                <p className="info-body-header">Region</p>
                {data.region ? <p>{data.region}</p> : <p>No region</p>}

                <p className="info-body-header">Country</p>
                <p>{data.country}</p>
                <p className="info-body-header">Phone</p>
                <p>{data.phone}</p>
                <p className="info-body-header">Fax</p>
                <p>{data.fax}</p>
              </div>
            </div>

            <div className="info-footer-user">
              <button
                className="bt-return"
                onClick={() => navigate("/customers")}
              >
                Go back
              </button>
            </div>
          </div>
        ) : (
          <div>No result</div>
        )}
      </div>
    </div>
  );
};

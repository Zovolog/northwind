import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Logs } from "../../Main";

interface supplier {
  companyName: string;
  contactName: string;
  contactTitle: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  region: string;
}
export const Supplier: React.FC = () => {
  const { userSupplierID } = useParams();
  const [data, getData] = useState<supplier | null>(null);
  const navigate = useNavigate();

  const { handleDashChange, resCount } = useContext(Logs);
  useEffect(() => {
    axios
      .get(`https://northwind.onrender.com/suppliers/${userSupplierID}`)
      .then(function (response) {
        getData(response.data.supplier.data);
        console.log(response.data);
        handleDashChange((prevState: any) => {
          const updateDash = [response.data.supplier.info, ...prevState];
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
                Supplier information
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
                <p className="info-body-header">Region</p>
                <p>{data.region}</p>
                <p className="info-body-header">Postal Code</p>
                <p>{data.postalCode}</p>
                <p className="info-body-header">Country</p>
                <p>{data.country}</p>
                <p className="info-body-header">Phone</p>
                <p>{data.phone}</p>
              </div>
            </div>

            <div className="info-footer-user">
              <button
                className="bt-return"
                onClick={() => navigate("/suppliers")}
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

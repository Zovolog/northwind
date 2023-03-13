import { useEffect, useState } from "react";
import axios from "axios";
export const Suppliers: React.FC = () => {
  const [data, getData] = useState([]);
  useEffect(() => {
    axios
      .get(`https://northwind.onrender.com/suppliers?page=1`)
      .then(function (response) {
        console.log(response.data);
        let info = response.data.suppliers.data;
        getData(info)
        console.log(response.data.suppliers.data[0].companyName);
      })
      .catch(function (error) {});
  }, []);
  return (
    <div>
      <div className="info-wrapper">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,400,1,0"
        />
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
                  <th>Company</th>
                  <th>Contact</th>
                  <th>Title</th>
                  <th>City</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user: any) => (
              <tr>
            <th>{user.companyName}</th>
            <th>{user.contactName}</th>
            <th>{user.contactTitle}</th>
            <th>{user.city}</th>
            <th>{user.country}</th>
          </tr>))}
        </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

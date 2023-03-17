import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
interface product {
  productName: string;
  supplierID: number;
  quantityPerUnit: string;
  unitPrice: string;
  unitsInStock: number;
  unitsOnOrder: number;
  reorderLevel: number;
  discontinued: boolean;
}
export const Product: React.FC = () => {
  const { productId } = useParams();
  const [data, getData] = useState<product | null>(null);
  const [nameSupplier, getnameSupplier] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://northwind.onrender.com/products/${productId}`)
      .then(function (response) {
        getData(response.data.product.data.products);
        getnameSupplier(response.data.product.data.suppliers.companyName);
        console.log(response.data.product.data);
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
              Product information
            </p>
          </div>
          {data ? (
            <div className="info-body-user">
              <div className="info-body-user-text-block">
                <p className="info-body-header">Product Name</p>
                <p>{data.productName}</p>
                <p className="info-body-header">Supplier</p>
                <Link to={`/suppliers/${data.supplierID}`} className="link">
                  <p>{nameSupplier}</p>
                </Link>

                <p className="info-body-header">Quantity Per Unit</p>
                <p>{data.quantityPerUnit}</p>
                <p className="info-body-header">Unit Price</p>
                <p>{data.unitPrice}</p>
              </div>
              <div className="info-body-user-text-block">
                <p className="info-body-header">Units In Stock</p>
                <p>{data.unitsInStock}</p>
                <p className="info-body-header">Units In Order</p>
                <p>{data.unitsOnOrder}</p>
                <p className="info-body-header">Reorder Level</p>
                <p>{data.reorderLevel}</p>
                <p className="info-body-header">Discontinued</p>
                <p>{data.discontinued ? 1 : 0}</p>
              </div>
            </div>
          ) : (
            <div>No such product</div>
          )}
          <div className="info-footer-user">
            <button className="bt-return" onClick={() => navigate("/products")}>
              Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getproducts } from "../features/products/Productslice";

const Viewproduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getproducts());
  }, [dispatch]);

  const products = useSelector(
    (state) => state.products.products || []
  );
  console.log("Route ID:", id);
// console.log("Products:", products);

  const product = products.find(
    (item) => String(item.id) === String(id)
  );
  // console.log("Selected Product:", product);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container mt-4 mb-5">
  {/* Back navigation */}
  <button
    className="btn btn-outline-secondary btn-sm mb-4"
    onClick={() => navigate("/products")}
  >
    &larr; Back to Products
  </button>

  <div className="card shadow-sm border-0">
    <div className="row g-0">
      {/* Product image */}
      <div className="col-md-5 d-flex align-items-center justify-content-center bg-light p-4">
        <img
          src={product.image}
          alt={product.name}
          className="img-fluid rounded"
          style={{ maxHeight: "350px", objectFit: "contain" }}
        />
      </div>

      {/* Product details */}
      <div className="col-md-7">
        <div className="card-body d-flex flex-column h-100 p-4">
          <h2 className="card-title fw-bold mb-2">{product.name}</h2>

          {product.category && (
            <span className="badge bg-secondary-subtle text-secondary mb-3 align-self-start">
              {product.category}
            </span>
          )}

          <h3 className="text-success fw-semibold mb-3">
            ₹{product.price}
          </h3>

          {product.description && (
            <p className="text-muted mb-4">{product.description}</p>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Viewproduct;
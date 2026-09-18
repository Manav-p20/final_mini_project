import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  getproducts,
  addproduct,
  updateproduct,
  removeproduct,
} from "../features/products/Productslice";

import { useTheme } from "../context/Themecontext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // THEME
  const { darkMode } = useTheme();

  // REDUX PRODUCTS
  const products = useSelector(
    (state) => state.products.products || []
  );

  // FORM STATES
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  // FILTER STATES
  const [maxprice, setmaxprice] = useState(0);
  const [searchproduct, setSearchproduct] = useState("");

  // EDIT STATE
  const [editId, setEditId] = useState(null);

  // GET PRODUCTS
  useEffect(() => {
    dispatch(getproducts());
  }, [dispatch]);

  // MAXIMUM PRODUCT PRICE
  const maximumprice =
    products.length > 0
      ? Math.max(
          ...products.map((product) =>
            Number(product.price)
          )
        )
      : 0;

  // SET INITIAL MAX PRICE
  useEffect(() => {
    if (maximumprice > 0 && maxprice === 0) {
      setmaxprice(maximumprice);
    }
  }, [maximumprice, maxprice]);

  // ADD / UPDATE PRODUCT
  const handleSubmit = () => {
    // VALIDATION
    if (!name.trim()) {
      toast.error("Product name is required");
      return;
    }

    if (!price || Number(price) <= 0) {
      toast.error("Please enter a valid product price");
      return;
    }

    if (!image.trim()) {
      toast.error("Product image URL is required");
      return;
    }

    // UPDATE PRODUCT
    if (editId !== null) {
      const updatedProduct = {
        id: editId,
        name: name.trim(),
        price: Number(price),
        image: image.trim(),
      };

      dispatch(updateproduct(updatedProduct));

      toast.success("Product updated successfully!");

      setName("");
      setPrice("");
      setImage("");
      setEditId(null);

      return;
    }

    // ADD PRODUCT
    const newProduct = {
      id: Date.now(),
      name: name.trim(),
      price: Number(price),
      image: image.trim(),
    };

    dispatch(addproduct(newProduct));

    toast.success("Product added successfully!");

    setName("");
    setPrice("");
    setImage("");
  };

  // EDIT PRODUCT
  const handleEdit = (product) => {
    setEditId(product.id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);

    toast.info("Editing product");
  };

  // DELETE PRODUCT
  const handleDelete = (id) => {
    dispatch(removeproduct(id));

    toast.success("Product deleted successfully!");
  };

  // CANCEL UPDATE
  const handleCancel = () => {
    setEditId(null);
    setName("");
    setPrice("");
    setImage("");

    toast.info("Product update cancelled");
  };

  // SEARCH + PRICE FILTER
  const filterproduct = products.filter((product) => {
    const matchsearch = product.name
      .toLowerCase()
      .includes(searchproduct.toLowerCase());

    const matchprice =
      maxprice === 0 ||
      Number(product.price) <= Number(maxprice);

    return matchsearch && matchprice;
  });

  // VIEW PRODUCT
  const ViewDetails = (product) => {
    navigate(`/viewproduct/${product.id}`);
  };

  return (
    <div
      className={`min-vh-100 ${
        darkMode ? "theme-dark" : "theme-light"
      }`}
    >
      {/* TOAST NOTIFICATIONS */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />

      {/* NAVBAR */}
      <Navbar />

      <div className="d-flex">
        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <div className="products-content p-4 w-100">
          <h2 className="mb-4">
            Products
          </h2>

          {/* =========================
              PRODUCT FORM
          ========================== */}

          <div className="card shadow-sm border-0 p-4 mb-4">
            <h5 className="mb-3">
              {editId !== null
                ? "Update Product"
                : "Add Product"}
            </h5>

            {/* PRODUCT NAME */}
            <input
              type="text"
              placeholder="Enter Product Name"
              className="form-control mb-3"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            {/* PRODUCT PRICE */}
            <input
              type="number"
              placeholder="Enter Product Price"
              className="form-control mb-3"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
            />

            {/* PRODUCT IMAGE */}
            <input
              type="text"
              placeholder="Enter Product Image URL"
              className="form-control mb-3"
              value={image}
              onChange={(e) =>
                setImage(e.target.value)
              }
            />

            {/* IMAGE PREVIEW */}
            {image && (
              <div className="mb-3">
                <p className="mb-2">
                  Image Preview:
                </p>

                <img
                  src={image}
                  alt="Product Preview"
                  width="120"
                  height="120"
                  style={{
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>
            )}

            {/* BUTTONS */}
            <div>
              <button
                type="button"
                className={
                  editId !== null
                    ? "btn btn-primary me-2"
                    : "btn btn-success me-2"
                }
                onClick={handleSubmit}
              >
                {editId !== null
                  ? "Update Product"
                  : "Add Product"}
              </button>

              {editId !== null && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* =========================
              SEARCH PRODUCT
          ========================== */}

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search Product"
              value={searchproduct}
              onChange={(e) =>
                setSearchproduct(e.target.value)
              }
            />
          </div>

          {/* =========================
              PRICE FILTER
          ========================== */}

          <div className="mb-4">
            <label className="form-label">
              Maximum Price: ₹{maxprice}
            </label>

            <input
              type="range"
              className="form-range"
              min="0"
              max={maximumprice || 0}
              value={maxprice}
              onChange={(e) =>
                setmaxprice(Number(e.target.value))
              }
            />
          </div>

          {/* =========================
              PRODUCT TABLE
          ========================== */}

          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead>
                <tr>
                  <th className="text-center">
                    Image
                  </th>

                  <th className="text-center">
                    Name
                  </th>

                  <th className="text-center">
                    Price
                  </th>

                  <th className="text-center">
                    Action
                  </th>

                  <th className="text-center">
                    View Details
                  </th>
                </tr>
              </thead>

              <tbody className="text-center">
                {filterproduct.length > 0 ? (
                  filterproduct.map((product) => (
                    <tr key={product.id}>
                      {/* IMAGE */}
                      <td>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{
                            objectFit: "cover",
                            borderRadius: "8px",
                            height: "250px",
                            width: "350px",
                            maxWidth: "100%",
                          }}
                        />
                      </td>

                      {/* NAME */}
                      <td>
                        {product.name}
                      </td>

                      {/* PRICE */}
                      <td>
                        ₹{product.price}
                      </td>

                      {/* ACTION BUTTONS */}
                      <td>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm me-2"
                          onClick={() =>
                            handleEdit(product)
                          }
                        >
                          Update
                        </button>

                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleDelete(product.id)
                          }
                        >
                          Delete
                        </button>
                      </td>

                      {/* VIEW PRODUCT */}
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() =>
                            ViewDetails(product)
                          }
                        >
                          View Product
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-5 text-center"
                    >
                      Product Not Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
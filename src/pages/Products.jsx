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

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const [searchproduct, setsearchproduct] = useState("");
  const [editId, setEditId] = useState(null);

  // GET PRODUCTS
  useEffect(() => {
    dispatch(getproducts());
  }, [dispatch]);

  // ADD / UPDATE PRODUCT
  const handleSubmit = () => {
    if (!name.trim() || !price || !image.trim()) {
      alert("Please enter name, price and image URL");
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

      // Clear fields
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

    // Clear fields
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
  };

  // DELETE PRODUCT
  const handleDelete = (id) => {
    dispatch(removeproduct(id));
  };

  // CANCEL UPDATE
  const handleCancel = () => {
    setEditId(null);

    setName("");
    setPrice("");
    setImage("");
  };

  // search product
  const filterproduct = products.filter((product) => {
    return (
      product.price,
      product.name.toLowerCase().includes(searchproduct.toLowerCase())
    );
  });

  const ViewDetails = (product) => {
    console.log(product.id);
    navigate(`/viewproduct/${product.id}`);
  };

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="p-4 w-100">
          <h2>Products</h2>

          {/* PRODUCT FORM */}

          <div className="mb-4">
            {/* NAME */}
            <input
              type="text"
              placeholder="Enter Product Name"
              className="form-control mb-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* PRICE */}
            <input
              type="number"
              placeholder="Enter Product Price"
              className="form-control mb-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            {/* IMAGE URL */}
            <input
              type="text"
              placeholder="Enter Product Image URL"
              className="form-control mb-2"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />

            {/* IMAGE PREVIEW */}

            {image && (
              <div className="mb-3">
                <p>Image Preview:</p>

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

            {/* SUBMIT BUTTON */}

            <button
              className={
                editId !== null
                  ? "btn btn-primary me-2"
                  : "btn btn-success me-2"
              }
              onClick={handleSubmit}
            >
              {editId !== null ? "Update Product" : "Add Product"}
            </button>

            {/* CANCEL BUTTON */}

            {editId !== null && (
              <button className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>

          {/* PRODUCT TABLE */}

          <input
            className=""
            type="text"
            placeholder="Search Product"
            value={searchproduct}
            onChange={(e) => setsearchproduct(e.target.value)}
          />

          <table className="table table-bordered">
            <thead className="">
              <tr className="">
                <th className="text-center">Image</th>
                <th className="px-5 text-center">Name</th>
                <th className="px-5 text-center">Price</th>
                <th className="px-5 text-center">Action</th>
                <th className="px-5 text-center">View Details</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {filterproduct.length > 0 ? (
                filterproduct.map((product) => (
                  <tr key={product.id}>
                    {/* PRODUCT IMAGE */}

                    <td>
                      <img
                        src={product.image}
                        alt={product.name}
                        width="80"
                        height="80"
                        style={{
                          objectFit: "cover",
                          borderRadius: "8px",
                          height: "250px",
                          width: "350px",
                        }}
                      />
                    </td>

                    {/* PRODUCT NAME */}

                    <td>{product.name}</td>

                    {/* PRODUCT PRICE */}

                    <td>₹{product.price}</td>

                    {/* ACTIONS */}

                    <td>
                      {/* UPDATE */}

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(product)}
                      >
                        Update
                      </button>

                      {/* DELETE */}

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => ViewDetails(product)}
                      >
                        View Product
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <p className="py-5 px-5">Product Not Found</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Products;

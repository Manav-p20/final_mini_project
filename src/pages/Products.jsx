import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getproducts, addproduct, removeproduct } from "../features/products/Productslice";

const Products = () => {
const dispatch = useDispatch();
const products = useSelector((state) => state.products.products);
  const [name, setname] = useState("");
  const [price, setprice] = useState(0);


  useEffect (() => {
    dispatch(getproducts());
  }, [dispatch]);

  const handleadd = () => {
    if (!name || !price) return;

    const newproducts = {
      id: Date.now(),
      name,
      price,
    };

    dispatch(addproduct(newproducts));
    setname("");
    setprice("");
  };

  const handledelete = (id) => {
    dispatch(removeproduct(id));
  };
  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <div className="p-4 w-100">
          <h2>Products</h2>
          {/* add products  */}

          <div className="mb-3">
            <input
              type="text"
              placeholder="Enter Product name"
              className="form-control mb-2"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />

            <input
              type="number"
              placeholder="Enter Product price"
              className="form-control mb-2"
              value={price}
              onChange={(e) => setprice(e.target.value)}
            />

            <button className="btn btn-success" onClick={handleadd}>
              Add Product
            </button>
          </div>

          {/* product list  */}
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handledelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Products;

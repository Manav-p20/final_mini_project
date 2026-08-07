import React, { useEffect } from "react";
import { useState } from "react";
import { fetchUsers } from "../features/users/Usersslice";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";

const Users = () => {
  const dispatch = useDispatch();

  const { totalusers, loading, error } = useSelector((state) => state.user);

  const [searchuser, setsearchuser] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const userssearch = totalusers.filter((user) => {
    return user.name.toLowerCase().includes(searchuser.toLowerCase());
  });

  if (loading) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  if (error) {
    return <h3 className="text-center mt-5">Error: {error}</h3>;
  }

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <input
          type="text"
          placeholder="Search User"
          value={searchuser}
          onChange={(e) => setsearchuser(e.target.value)}
        />
        <div className="card shadow">
          <div className="card-header bg-dark text-white">
            <h3 className="mb-0">Users List</h3>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    {/* <th scope="col">#</th> */}
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Password</th>
                  </tr>
                </thead>

                <tbody>
                  {userssearch.length > 0 ? (
                    userssearch.map((user, index) => (
                      <tr key={user.id || index}>
                        <td>{index + 1}</td>
                        {/* <td>{user.id}</td> */}
                        <td>{user.name}</td>
                        <td>{user.password}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3}>User Not Found </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;

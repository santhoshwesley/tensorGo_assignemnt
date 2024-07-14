import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/Dashboard.css";

const Main = () => {
  const [category, setCategory] = useState("General Queries");
  const [comments, setComments] = useState("");
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/requests`,
        { category, comments },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setError(null);
      setCategory("General Queries");
      setComments("");
      fetchRequests();
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRequests(response.data);
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  const handleDeleteRequest = async (requestId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/requests/${requestId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchRequests();
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="main-container">
      <form onSubmit={handleSubmit}>
        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="General Queries">General Queries</option>
            <option value="Product Features Queries">
              Product Features Queries
            </option>
            <option value="Product Pricing Queries">
              Product Pricing Queries
            </option>
            <option value="Product Feature Implementation Requests">
              Product Feature Implementation Requests
            </option>
          </select>
        </label>
        <label>
          Comments:
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">Error: {error}</p>}
      <div className="requests">
        <h2>Customer Service Requests</h2>
        {requests.map((request) => (
          <div key={request._id} className="request-item">
            <p>Category: {request.category}</p>
            <p>Comments: {request.comments}</p>
            <button onClick={() => handleDeleteRequest(request._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;

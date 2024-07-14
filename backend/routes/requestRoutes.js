const express = require("express");
const router = express.Router();
const Request = require("../models/requestModel");

router.get("/requests", async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Server error: Failed to fetch requests" });
  }
});

router.post("/requests", async (req, res) => {
  const { category, comments } = req.body;
  if (!category || !comments) {
    return res
      .status(400)
      .json({ message: "Category and comments are required" });
  }

  try {
    const newRequest = new Request({ category, comments });
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (err) {
    res.status(500).json({
      message: `Server error: Failed to create request - ${err.message}`,
    });
  }
});

router.delete("/requests/:id", async (req, res) => {
  try {
    const requestId = req.params.id;
    const deletedRequest = await Request.findByIdAndDelete(requestId);
    if (!deletedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.json({ message: "Request deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error: Failed to delete request" });
  }
});

module.exports = router;

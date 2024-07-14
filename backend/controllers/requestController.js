const Request = require("../models/requestModel");
const Intercom = require("../services/intercomService");

exports.createRequest = async (req, res, next) => {
  try {
    const { category, comments } = req.body;

    const request = new Request({
      user: req.userId,
      category,
      comments,
    });
    await request.save();
    await Intercom(req.userId, category, comments);
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getRequests = async (req, res, next) => {
  try {
    const requests = await Request.find({
      category: req.params.category,
    }).populate("user");
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

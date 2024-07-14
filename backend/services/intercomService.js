const axios = require("axios");
const INTERCOM_ACCESS_TOKEN = process.env.INTERCOM_ACCESS_TOKEN;

exports.createIntercomRequest = async (userId, category, comments) => {
  try {
    await axios.post(
      "https://api.intercom.io/messages",
      {
        message_type: "inbox",
        subject: category,
        body: comments,
        from: { type: "user", id: userId },
      },
      {
        headers: { Authorization: `Bearer ${INTERCOM_ACCESS_TOKEN}` },
      }
    );
  } catch (error) {
    console.error("Failed to create Intercom request", error);
  }
};

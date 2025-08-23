const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  const code = req.body.code;
  if (!code) {
    return res.status(400).send("Prompt Empty");
  }

  try {
    const reply = await aiService(code);
    res.send(reply);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong.");
  }
};

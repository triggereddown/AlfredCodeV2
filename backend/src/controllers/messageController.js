const sendMessage = async (req, res) => {
  try {
    //Since we know that in auth we have saved id of looged in user so we will get it from there

    const senderId = req.id;

    const receiverId = req.params.id;
    // So now wqe have the id of sender as well as receiver ^^
    const { message } = req.body;
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Message controller error" });
  }
};

module.exports = { sendMessage };

const Conversation = require("../models/conversationModel.js");
const Message = require("../models/messageModel.js");
const { io, getReceiverSocketId } = require("../socket/socket.js");

const sendMessage = async (req, res) => {
  try {
    //Since we know that in auth we have saved id of logged in user so we will get it from there

    const senderId = req.id;

    const receiverId = req.params.id;
    // So now wqe have the id of sender as well as receiver ^^
    const { message } = req.body;
    //We declare a variabe tp check how many conversations are going on and among them do we have sender and receiverid as participants or not
    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // Its like checking the register that if conversation doesn't exists then in the db we will create one between two
    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    //So the message is created here aS we have passed the required 3 entries one by one
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
    }

    await gotConversation.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", {
        newMessage,
      });
    }

    return res.status(200).json({
      newMessage,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Message controller error" });
  }
};

const getMessage = async (req, res) => {
  try {
    //taking id of receiver from the users hit rout endpoint body
    const receiverId = req.params.id;
    const senderId = req.id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    console.log(conversation.messages);
    return res.status(200).json({
      success: true,
      messages: conversation ? conversation.messages : [],
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Message controller error" });
  }
};

module.exports = { sendMessage, getMessage };

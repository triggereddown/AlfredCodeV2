// Who two people are communicating with each other
// This model depics the schema btween two people's conversation

const mongoose = require("mongoose");
const conversationModel = new mongoose.Schema(
  {
    // Who are in the chat two people most likely
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        //Reference of user model as we need id of user
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        //   reference of message model as we need id of message
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Conversation", conversationModel);

const mongoose = require("mongoose");

// Define the contact schema
const contactSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create a Contact model based on the schema
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;

// Controllers are essentially the middleman between the routes (URL endpoints) and the data or business logic of your application. They help keep the routes clean and focused on handling HTTP-related tasks while delegating the actual processing to the controller functions.
// basically, we define logic of routes in this sepearted file

// any errors that occur inside the asyncHandler will be passed to the error-handling middleware
const asyncHandler = require("express-async-handler");
const Contact = require("../models/ContactSchema");

// desc: get all contacts , route: GET /api/contacts , access: private
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json({ message: "get all contacts", contacts: contacts });
});

// desc: get individual contact , route: GET /api/contacts/:id , access: private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  res
    .status(200)
    .json({ message: `get contact for ${req.params.id}`, contact: contact });
});

// desc: create new contact , route: POST /api/contacts , access: public
const createContact = asyncHandler(async (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  try {
    // Create a new instance of the Contact model
    const newContact = new Contact({ name, number, user_id: req.user.id });
    // remember, user_id is coming from "validateToken" middleware

    // Save the new contact to the database
    const savedContact = await newContact.save();

    res
      .status(201)
      .json({ message: "created new contact", contact: savedContact });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
});

// desc: update contact , route: PUT /api/contacts/:id , access: private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }

  // if a unathorized user is trying to update contact of another user
  if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("user dont have permission to update the contact")
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({
    message: `update contact for ${req.params.id}`,
    contact: updatedContact,
  });
});

// desc: delete contact , route: DELETE /api/contacts/:id , access: private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }

   // if a unathorized user is trying to delete contact of another user
   if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("user dont have permission to delete the contact")
  }

  await Contact.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json({ message: `delete contact for ${req.params.id}`, contact: contact });
});

module.exports = {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};

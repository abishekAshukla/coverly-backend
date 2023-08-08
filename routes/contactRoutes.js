const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

// this is how you can define routes using middleware
router.route("/test").get((req, res) => {
  res.status(200).json({ message: "testing" });
});

// getting api logic from controller i.e. contactController
router.route("/").get(validateToken, getAllContacts);

router.route("/").post(validateToken, createContact);

// multiple http methods per route
// "validateToken" middleware is used to make the APIs private
router
  .route("/:id")
  .get(validateToken, getContact)
  .put(validateToken, updateContact)
  .delete(validateToken, deleteContact);

module.exports = router;

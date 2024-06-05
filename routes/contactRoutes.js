const express = require("express");
// const controller = require("../controllers/contactController");
const router = express.Router();
const Contact = require("../models/contactModel");

const asynchandler = require("express-async-handler");

// router.get("/", controller.getContact);

router.get(
  "/",
  asynchandler(async (req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
  })
);

router.post(
  "/",
  asynchandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400);
      throw new Error("All fills are Mandatory");
    }
    const contact = await Contact.create({
      name,
      email,
      phone,
    });
    res.json(contact);
  })
);

router.get(
  "/:id",
  asynchandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    res.json(contact);
  })
);

router.put(
  "/:id",
  asynchandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedContact);
  })
);

router.delete(
  "/:id",
  asynchandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    await Contact.deleteOne();
    res.json(contact);
  })
);

module.exports = router;

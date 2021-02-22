// ALL REQUEST CONTROLLERS
const Contact = require("../models/contact")

// POST REQUEST
const createContact = async (req, res) => {
    const { name, subject, email, message } = req.body;

    const createdContact = new Contact({ name, subject, email, message });

    try {
        insertedContact = await createdContact.save();

        // res.status(201).send(insertedContact);
        res.render("index");
    }

    catch (err) {
        res.status(409).send(err);
    }
};

module.exports = createContact;
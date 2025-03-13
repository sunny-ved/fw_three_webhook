const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// In-memory email storage (replace with DB later)
const emailList = new Set();

// Endpoint to add email
app.post("/add-email", (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }
    emailList.add(email);
    res.json({ message: "Email added successfully", email });
});

// Endpoint to check email existence
app.post("/check-email", (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }
    const exists = emailList.has(email);
    res.json({ email, exists });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

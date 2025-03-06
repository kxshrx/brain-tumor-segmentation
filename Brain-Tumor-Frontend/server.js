const express = require("express");
const multer = require("multer");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");
const FormData = require("form-data");

const app = express();
const PORT = 3000;

// Enable CORS (Allows communication with Flask API)
app.use(cors());

// Serve static files (HTML, CSS)
app.use(express.static("public"));

// Multer setup for handling image uploads
const upload = multer({ dest: "uploads/" });

// Route for handling image upload
app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // ✅ Flask API URL (Fix incorrect format)
    const flaskAPI = "http://127.0.0.1:8000/predict";

    // ✅ Create FormData for sending the image
    const formData = new FormData();
    formData.append("file", fs.createReadStream(req.file.path));

    // ✅ Send the image to Flask API
    const response = await axios.post(flaskAPI, formData, {
      headers: {
        ...formData.getHeaders(), // Set correct multipart headers
      },
    });

    // ✅ Delete the temp uploaded file
    fs.unlinkSync(req.file.path);

    // ✅ Send prediction response to frontend
    res.json(response.data);
  } catch (error) {
    console.error("Error communicating with Flask API:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Express server running at http://localhost:${PORT}`);
});

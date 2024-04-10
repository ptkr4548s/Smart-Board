const express = require("express");
const router = express.Router();
const Canvas = require("../../models/canvas");

router.post("/files", async (req, res) => {
  try {
    const { fileName, imageData, email } = req.body;

    // Check if any of the required fields are missing
    if (!fileName || !imageData || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Convert base64 image data to Buffer
    const imageDataBuffer = Buffer.from(imageData, 'base64');

    // Create a new Canvas document
    const canvas = new Canvas({
      fileName,
   imageData,
      email
    });

    // Save the canvas document to MongoDB
    await canvas.save();

    // Respond with a success message
    res.status(201).json({ message: "Canvas data saved successfully" });
  } catch (error) {
    // If an error occurs, log it and respond with a 500 status code
    console.error("Error saving canvas data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get('/files', async (req, res) => {
  try {
    // Query the database to fetch all documents
    const allData = await Canvas.find();

    // Return the fetched data as a response
    res.status(200).json(allData);
  } catch (error) {
    // If an error occurs, respond with an error message
    console.error('Error fetching canvas data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

module.exports = router;






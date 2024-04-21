const express = require("express");
const axios = require("axios");
const path = require("path");
const fs = require("fs").promises; // Using fs.promises for async file operations

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 6000; // Using process.env.PORT as fallback

// Middleware for handling errors
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
}

app.post("/store-file", async (req, res, next) => {
  try {
    const { file, data } = req.body;

    if (!file || !data) {
      return res.status(400).json({ file: null, error: "Invalid JSON input." });
    }

    const filePath = path.join("/kazi_PV_dir", file);
    await fs.writeFile(filePath, data); // Using await with fs.promises.writeFile

    return res.json({ file, message: "Success." });
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
});

app.post("/calculate", async (req, res, next) => {
  try {
    const { file, product } = req.body;

    if (!file) {
      return res.status(400).json({ file: null, error: "Invalid JSON input." });
    }

    const response = await axios.post(
      "http://container-2-service:8000/calculate",
      {
        file,
        product,
      }
    );

    return res.json(response.data);
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 404) {
        return res.status(404).json({ file, error: "File not found." });
      } else if (status === 200) {
        return res
          .status(200)
          .json({ file, error: "Input file not in CSV format." });
      }
    }

    next(error); // Pass error to the error handling middleware
  }
});

// Using a wildcard route to handle all unspecified routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

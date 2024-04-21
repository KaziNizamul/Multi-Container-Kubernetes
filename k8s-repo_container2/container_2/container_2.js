const express = require("express");
const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.post("/calculate", (req, res) => {
  const { file, product } = req.body;

  if (!file) {
    return res.status(400).json({ file: null, error: "Invalid JSON input." });
  }

  const filePath = path.join("/kazi_PV_dir", file);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ file, error: "File not found." });
  }

  const rows = [];

  const csvStream = fs
    .createReadStream(filePath)
    .pipe(csv.parse({ headers: true, trim: true }));

  csvStream.on("error", () => {
    return res
      .status(400)
      .json({ file, error: "Input file not in CSV format." });
  });

  csvStream.on("data", (row) => {
    rows.push(row);
  });

  csvStream.on("end", () => {
    const header = csvStream.parser.options.headers;
    if (!header || !header.includes("product") || !header.includes("amount")) {
      return res.status(400).json({ file, error: "Invalid CSV file format." });
    }

    const sum = rows
      .filter((row) => row.product === product && !isNaN(parseInt(row.amount)))
      .reduce((total, row) => total + parseInt(row.amount), 0);

    return res.json({ file, sum });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

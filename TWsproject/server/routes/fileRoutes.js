const fs = require("fs");
const express = require("express");
const multer = require("multer");
const XLSX = require("xlsx");
const router = express.Router();
const Employee = require("../models/employee");
const path = require("path");

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure to create an 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// POST route to handle file upload
router.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if(sheetData.length > 0) {
      let fileData = sheetData.map((ele) => {
        let info = {};

        info.age = ele.Age;
        info.country = ele.Country;
        info.date = ele.Date;
        info.firstName = ele["First Name"];
        info.lastName = ele["Last Name"];
        info.gender = ele.Gender;

        return info;
      })

      let result = await Employee.insertMany(fileData);

      if (!result) {
        // Process the data as needed
        res.status(400).json({
          message: "Unable to import data into database and"
        });
      }

      let filePath = path.resolve(__dirname, `../${req.file.path}`);
      try {
        fs.unlinkSync(filePath);
        console.log("File deleted successfully!");
      } catch (err) {
        console.error("Error deleting the file:", err);
      }

      // Process the data as needed
      return res.status(200).json({
        message: "Success"
      });
    }

  } catch (error) {
    res.status(500).json({ message: "Error processing file", error });
  }
});

module.exports = router;

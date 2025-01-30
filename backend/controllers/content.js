const content = require('../models/content');
const mongoose = require('mongoose');
const users = require('../models/user');
const csvParser = require("csv-parser");
const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");

const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
};

const parseExcel = async (filePath) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.worksheets[0];

  const jsonData = [];
  const headers = worksheet.getRow(1).values.slice(1); 

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; 
    const rowData = {};
    row.eachCell((cell, colNumber) => {
      rowData[headers[colNumber - 1]] = cell.value;
    });
    jsonData.push(rowData);
  });

  return jsonData;
};

async function createAndProcessPost(req, res) {
  const { title } = req.body;
  const user = req.user;

  // Validate file upload
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const filePath = req.file.path;
  const ext = path.extname(req.file.originalname).toLowerCase();
  let jsonData = [];

  try {
    // Parse the uploaded file based on extension
    if (ext === ".csv") {
      jsonData = await parseCSV(filePath);
    } else if (ext === ".xlsx" || ext === ".xls") {
      jsonData = await parseExcel(filePath);
    } else if (ext === ".json") {
      jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } else {
      return res.status(400).json({ error: "Invalid file format" });
    }

    // Remove temporary file after processing
    fs.unlinkSync(filePath);

    // Create the new content document with title and user data
    const objectId = new mongoose.Types.ObjectId(user._id);
    const newContent = await content.create({
      Title: title,
      createdBy: objectId,
      content: jsonData // Attach the parsed content directly
    });

    // Update user with the new content workflow
    await users.findByIdAndUpdate(user._id, { $addToSet: { Workflows: newContent._id } });

    return res.json({ success: true, message: "Workflow created and data processed successfully", id: newContent.id });
  } catch (error) {
    return res.status(500).json({ error: "Error processing file and creating workflow", details: error });
  }
}

module.exports = { createAndProcessPost };

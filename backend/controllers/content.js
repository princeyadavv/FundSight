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

async function converter(req, res) {
    console.log('request aagyi');
    const { id } = req.body;
  
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ObjectId format" });
    }
  
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
  
      // Find the content document by id
      const hamaracontent = await content.findById(id);
      if (!hamaracontent) {
        return res.status(404).json({ error: "Content not found" });
      }
  
      // Append new data to the existing content array
      hamaracontent.content = [...hamaracontent.content, ...jsonData];
      
      // Save the updated content
      await hamaracontent.save();
  
      res.json({ success: true, id: hamaracontent.id });
    } catch (error) {
      res.status(500).json({ error: "Error processing file", details: error });
    }
  }
  

async function createPost(req, res) {
  try {
    const { title } = req.body;
    const user = req.user;
    const objectId = new mongoose.Types.ObjectId(user.id);

    // Create new content document
    const newContent = await content.create({
      Title: title,
      createdBy: objectId,
    });

    // Add new content to the user's Workflows array
    await users.findByIdAndUpdate(user._id, { $addToSet: { Workflows: newContent._id } });

    return res.status(200).json({ message: "Workflow created successfully", id: newContent.id });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}

module.exports = { createPost, converter };

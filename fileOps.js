const fs = require("fs");

const FILE_NAME = "data.txt";

// Student details to write
const studentDetails = `Name: Revanth Reddy 
Roll No: 115
Branch: Information Technology
Year: 2nd
Email: revanth@gmail.com`;

// 1. Create and write student details to data.txt
fs.writeFile(FILE_NAME, studentDetails, (err) => {
  if (err) throw err;
  console.log("1. File created and student details written successfully.\n");

  // 2. Read and display file content
  fs.readFile(FILE_NAME, "utf8", (err, data) => {
    if (err) throw err;
    console.log("2. Reading file content:");
    console.log("---");
    console.log(data);
    console.log("---\n");

    // 3. Append new data asynchronously
    const newData = "\nPhone: 9876543210\nAddress: 123 Main Street";
    fs.appendFile(FILE_NAME, newData, (err) => {
      if (err) throw err;
      console.log("3. New data appended successfully.\n");

      // 4. Read again to show updated content
      fs.readFile(FILE_NAME, "utf8", (err, updatedData) => {
        if (err) throw err;
        console.log("4. Updated file content:");
        console.log("---");
        console.log(updatedData);
        console.log("---");
      });
    });
  });
});

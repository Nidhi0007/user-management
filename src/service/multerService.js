const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Define the directory where files will be uploaded
const uploadDirectory = "uploads/";

// Ensure the "uploads" folder exists; create it if it doesn't
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory); // Files will be uploaded to the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

module.exports = { upload };

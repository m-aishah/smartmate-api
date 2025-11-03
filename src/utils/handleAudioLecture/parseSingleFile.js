const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const parseSingleFile = (req, res) => {
  return new Promise((resolve, reject) => {
    upload.single("file")(req, res, err => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
};

module.exports = parseSingleFile;

const multer = require("multer");

const storage = () => {
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "uploads/");
    },
    filename: (req, file, callback) => {
      callback(null, Date.now() + "_" + file.originalname);
    },
  });

  return storage;
};

const allowedFile = (req, file, callback) => {
  if (
    !file.originalname.match(
      /\.(pdf|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|webp)$/
    )
  ) {
    req.fileValidationError = "Only  files are allowed!";
    return callback(new Error("Only  files are allowed!"), false);
  }
  callback(null, true);
};

const upload = multer({
  storage: storage(),
  allowedFile: allowedFile,
}).single("file");

module.exports = { storage, allowedFile, upload };

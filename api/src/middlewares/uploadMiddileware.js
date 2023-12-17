import multer from "multer";
import path from "path";

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  let ext = path.extname(file.originalname);
  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
    cb(new Error("file type is not supported"), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter });

export default upload;

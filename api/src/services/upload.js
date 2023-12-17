import multer from "multer";
import path from "path";

const upload =({
  storage: multer.diskStorage({}),
  limits: {
    files: 4,
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (![".jpg",".jpeg",".png",".webp"].includes(ext)) {
      cb(new Error("file type is not supported"), false);
    }
    cb(null, true);
  },
});

export default upload
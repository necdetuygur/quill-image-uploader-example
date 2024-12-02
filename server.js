const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const port = 3000;

// Multer konfigürasyonu
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}${~~(
      Math.random() * (9999 - 1000) +
      1000
    )}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

// Statik dosyalar için middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "public")));

// GET isteği geldiğinde index.html dosyasını döndür
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// POST isteği ile resim yükleme
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.status(402).json({ url: `/uploads/${req.file.filename}` });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

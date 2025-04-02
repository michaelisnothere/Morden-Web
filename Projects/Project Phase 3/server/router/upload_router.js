const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), (req, res) => {
  try {
    const { postType } = req.body;
    const file = req.file;

    if (!postType || !file) {
      return res.status(400).json({ error: "Post type and file are required" });
    }

    const dir = `./uploads/${postType}`;

    const filename = Date.now() + "--" + file.originalname;
    const filepath = dir + "/" + filename;
    fs.writeFileSync(filepath, file.buffer);

    res.status(200).json({
      message: `Upload successful to ${postType} directory`,
      filename,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;

const URL = require("../models/urlModels.js");

// function to generate shortcode
function generateShortCode() {
  return Math.random().toString(36).substring(2, 8);
}

const shortenURL = async (req, res) => {
  const { originalUrl } = req.body;

  const shortCode = generateShortCode();

  const newURL = new URL({
    originalUrl,
    shortCode,
  });

  await newURL.save();
  res.json({
    message: "ShortURL created successfully",
    shortUrl: `http://localhost:5000/${shortCode}`,
  });
};

// get URL route
const getUrl = async (req, res) => {
  const urlData = await URL.find();
  res.status(200).json({ data: urlData });
};

// post URL route
const postUrl = async (req, res) => {
  const urlData = new URL(req.body);
  await urlData.save();
  res.status(200).json({ data: urlData, message: "URL created successfully" });
};

// put URL route
const updateUrl = async (req, res) => {
  const { shortCode } = req.params;
  const urlData = await URL.findOneAndUpdate({ shortCode }, req.body, {
    new: true,
  });
  if (!urlData) {
    res.status(400).send("Url Data not found");
  }
  res
    .status(200)
    .json({ data: urlData, message: "urlData is updated successfully" });
};

// delete route
const deleteUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const result = await URL.findOneAndDelete({ shortCode });
    if (!result) {
      return res.status(404).json({ message: "Short URL not found" });
    }
    res.status(200).json({ message: "Short URL deleted", shortCode });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

module.exports = { getUrl, shortenURL, updateUrl, deleteUrl };

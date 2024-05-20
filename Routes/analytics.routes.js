const express = require("express");
const { HandleAnalysisShortUrl } = require("../controllers/url.controller");
const router = express.Router();


router.post('/', HandleAnalysisShortUrl);

module.exports = router;
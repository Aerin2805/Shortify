const express = require("express");
const { HandleGenrateShortId, HandleRedirectShortUrl, HandleAnalysisShortUrl } = require("../controllers/url.controller");
const router = express.Router();

router.get("/", (req, res) => {
    res.render('index');
});
router.post('/', HandleGenrateShortId);
router.get('/:shortUrl', HandleRedirectShortUrl);
module.exports = router;
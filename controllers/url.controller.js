const shortid = require("shortid");
const URL = require("../models/url.models");
const bodyParser = require('body-parser');

async function HandleGenrateShortId(req, res) {
    try {
        const longUrl = req.body.url;
        console.log(longUrl);
        const shortUrl = shortid.generate();
        console.log(shortUrl);
        await URL.create({
            shortId: shortUrl,
            redirectURL: longUrl,
            visitHistory: []
        })
        res.render('index', { title: 'URL Shortener', shortUrl: `${req.protocol}://${req.get('host')}/${shortUrl}` });
    } catch {
        res.status(404).json({ Error: "Please submit the URL , You Try to SHort" });
    }
}
async function HandleRedirectShortUrl(req, res) {
    const shorturl = req.params.shortUrl;
    try {
        const result = await URL.findOneAndUpdate({ shortId: shorturl }, {
            visitHistory: [{ timestamp: Date.now() }]
        });
        const longUrl = result.redirectURL;
        res.redirect(longUrl);
    } catch {
        res.status(404).send('URL not found');
    }

}

async function HandleAnalysisShortUrl(req, res) {
    const shortID = req.params.shortId;
    console.log(shortID);
    try {
        const result = await URL.findOne({ shortId: shortID });
        console.log(result);
        if (result) {
            return res.render('analysis', {
                title: 'URL Analysis',
                totalClicks: result.visitHistory.length,
                visitHistory: result.visitHistory
            });
        } else {
            return res.status(404).json({ Error: "Link not Found" });
        }
    } catch {
        return res.status(404).json({ Error: "Link not Found" });
    }


}
module.exports = {
    HandleGenrateShortId, HandleRedirectShortUrl, HandleAnalysisShortUrl
};
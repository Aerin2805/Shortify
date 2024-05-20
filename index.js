const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const urlRoute = require("./Routes/url.routes");
const AnalyticalRoute = require("./Routes/analytics.routes");
const ConnectDB = require("./connection");
const bodyParser = require('body-parser');
const shortid = require('shortid');
const URL = require("./models/url.models");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;


//view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//Database connection
ConnectDB(DB_URL);

//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


//Routes 
app.use('/url', urlRoute);
app.use('/', urlRoute);
app.use('/shorten', urlRoute);
app.post('/analytics', async (req, res) => {
    const shortLink = req.body.shortId;
    const shortID = shortLink.slice(-9);
    console.log(shortID)
    try {
        const result = await URL.findOne({ shortId: shortID });
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
});

app.listen(PORT, () => {
    console.log(`Server Running on PORT : ${PORT}`);
});
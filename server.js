const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require('mongoose');

const unicornSchema = new mongoose.Schema({
    name: String,
    weight: Number,
    loves: [String]
});

const unicornModel = mongoose.model("unicorns", unicornSchema);


app.listen(process.env.PORT || 5000, function (err) {
    if (err)
        console.log(err);
})

app.use(bodyparser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb+srv://juan:Rocco123@cluster0.nxfhi.mongodb.net/A3?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Instead of defining each static route, we can define a public folder that contains the static files we need
app.use(express.static("public"));

// This could've been a GET request instead, because we are not receiving any parameters
app.post("/findAll", function (req, res) {
    unicornModel.find({
    }, function (err, unicorns) {
        if (err) {
            console.log("Error " + err);
        }
        res.send(unicorns);
    });
})
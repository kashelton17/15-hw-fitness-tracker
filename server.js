const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3006;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/fitness-tracker", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    unUnifiedTopology: true
});

app.use(require("./routes/html-routes.js"));
app.use(require("./routes/api-routes.js"))

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});

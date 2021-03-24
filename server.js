const express = require("express");
const app = express();
const {PORT, mongoUri} = require("./config");

const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const itemsList = require("./routes/api/itemsList");

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());


mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
        .then(() => console.log("DB is CONNECTED"))
        .catch((err) => console.log("Nobody expected the error" + err));
    
app.use("/api/itemsList", itemsList);
app.get("/", (req, res) => res.send("This is a Hello test"));

app.listen(PORT,() => console.log(`Listening to port ${PORT}`))

    
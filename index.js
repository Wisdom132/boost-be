const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const textModel = require('./model')
const mongoose = require('mongoose')
let PORT = process.env.PORT || 4040

let app = express();
app.use(bodyParser.json()); //config json
app.use(bodyParser.urlencoded({ extended: false })); //config urlencoded
app.use(cors());

mongoose.set("useCreateIndex", true);
mongoose
    .connect("mongodb+srv://wisdom132:spinosky@cluster0-xzpmn.gcp.mongodb.net/roadapp?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(() => {
        console.log("Database is connected");
    })
    .catch(err => {
        console.log({ database_error: err });
    });


app.get('/', (req, res) => {
    res.status(200).json({ "Name": "Wisdom Ekpot" })
})


app.get('/texts', async (req, res) => {
    let texts = await textModel.find({});
    res.status(200).json({
        data: texts
    })
})


app.post('/add-text', async (req, res) => {
    let text = await textModel.create({
        text: req.body.text
    });

    res.status(200).json({
        data: text,
        message: 'ok'
    })
})

app.listen(PORT, () => {
    console.log('app is runing on port ', PORT);
})
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import Cards from "./dbCards.js";

// App config
const app = express();
const port = process.env.PORT || 8001
const connection_url = 'mongodb+srv://roadmap:csci152@csci152roadmap.aqfu4.mongodb.net/roadmap?retryWrites=true&w=majority';

// Middlewares
app.use(express.json());
app.use(cors());

// DB config
mongoose.connect(connection_url, {
})
// console.log(app.findOne());
// API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello World"));

app.post('/accounts', (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(201).send(data);
        }
    })
})

app.get('/accounts', (req, res) => {
    Cards.find((err, data) => {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
        }
    })
})


app.get('/accounts/email', function(req, res) {
    const dbCard = req.body;
    console.log(req.body);
    Cards.findOne(dbCard, (err, data) => {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
            res.json(result)
        }
    })
})

// Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));
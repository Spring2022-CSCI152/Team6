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

// API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello World"));

app.post('/cards', (req, res) => {
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

app.get('/cards', (req, res) => {
    Cards.find((err, data) => {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
        }
    })
})

// Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));
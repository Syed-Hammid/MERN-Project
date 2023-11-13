import express from 'express';
// const { default: mongoose } = require('mongoose');
import mongoose from 'mongoose';
// import { Book } from './models/bookmodel.js';
import router from './routes/bookRoute.js';
import { cors } from 'cors';
const app = express();
const mongoDBURL = "mongodb+srv://syed:12345@cluster0.6xbu7pu.mongodb.net/?retryWrites=true&w=majority";
app.use(express.json());
app.use(cors());
app.get("/", (req,res) => {
    res.status(201).send("Express Connected");
    // console.log("Backend is Connected");
})


app.use('/books', router);


mongoose.connect(mongoDBURL).then(() => {
    console.log("App is connected is database");
    // app.listen(5000, console.log("Backend is connected"));
}).catch((err) => {
    console.log(err);
});



app.listen(5000, console.log("Backend is connected"));
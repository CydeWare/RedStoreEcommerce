import dotenv from "dotenv";
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";
import userRoutes from "./routes/users.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: ['https://redstorebucket.s3-website-ap-southeast-2.amazonaws.com'],  // Your S3 domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  };

app.use(cors(corsOptions));

app.use(bodyParser.json({limit: "30mb", extended: true})); //We use limit since we will be sending images
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const DB_URL = "mongodb://Edward:idonotknown@cluster1-shard-00-00.y7oif.mongodb.net:27017,cluster1-shard-00-01.y7oif.mongodb.net:27017,cluster1-shard-00-02.y7oif.mongodb.net:27017/Aero?ssl=true&replicaSet=atlas-109t75-shard-0&authSource=admin&retryWrites=true&w=majority";

app.get("/", (req, res) => {
    res.send("<h1>Welcome to RedStore API!</h1>")
})

app.use("/products", productRoutes);

app.use("/cart", cartRoutes);
app.use("/user", userRoutes);

app.use("*", (req, res) => {
    res.end(`<h1>Page not found 404</h1>`)
})


mongoose.connect(DB_URL, { useNewUrlParser: true }, { useUnifiedTopology: true })
    .then((result) => {
        console.log("connected to DB");
        app.listen(PORT, '0.0.0.0', () => {
            console.log("listening on port " + PORT);
        });
    })
.catch((error) => {   console.log(error);    })

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
        
    })
.catch((error) => {   console.log(error);    })

app.listen(5000, '0.0.0.0', () => {
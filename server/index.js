const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authroute = require("./Routes/AuthRoute");


const app = express();
require("dotenv").config();

const {mongourl, port} = process.env;

mongoose.connect(mongourl, {
    useNewUrlParser: true ,
    useUnifiedTopology: true,
}).then(()=>console.log("mongodb connected ")).catch((err)=>console.error(err));

// const port = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


app.listen(port,()=>{
    console.log(`server Started On ${port}`);
})

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET","POST","PUT","DELETE"],
        credentials: true,
    })
)
app.use(cookieParser());
app.use("/", authroute);
app.use(express.json());


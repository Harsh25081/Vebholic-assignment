require("dotenv").config()
const express = require("express")
const route = require("./routes/route.js")
const app = express()



const mongoose = require("mongoose")
mongoose.connect(process.env.MongoDBURL,{useNewUrlParser:true})
.then(()=>console.log("MongoDB is Connected"))
.catch((err)=>console.log(err.message))


const cors = require("cors")
app.use(cors({
    origin: '*'
}));

app.use(express.json())

app.use("/",route)

app.listen(process.env.PORT,()=>console.log("Express app is running on PORT "+process.env.PORT))
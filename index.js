
//create app 
const express = require("express");
const app = express();

//=> Port find krna hai
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//=> middleware add karna hai
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/temp/'
}));

//connect to db
const db = require("./config/database");
db.connect();

//cloud connect
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//mount api route
const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload', Upload);

// activate server
app.listen(PORT, () => {
    console.log(`Appp is running at ${PORT}`);
})
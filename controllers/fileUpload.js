const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//localfileUpload -> handler function
exports.localFileUpload = async(req, res) => {
    try{
        //fetch file
        const file = req.files.file;
        console.log("File AAgyi oyee ->", file);

        //create path for storing file on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`
        console.log("PATH ->",path);
        
        //add path to move function
        file.mv(path, (err) => {
            console.log(err);
        });

        //create a suxccessful response
        res.json({
            success:true,
            message:"local file upload hogaiii",
            status: 200,
        });


    }catch(error) {
        console.log(error);
    }}


    function isFileTypeSupported(type, supportedTypes) {
        return supportedTypes.includes(type);
    }

    async function uploadFileToCloudinary(file, folder, quality) {
        const options = {folder};

        if(quality) {
            options.quality = quality;
        }

        options.resource_type = "auto";
        return await cloudinary.uploader.upload(file.tempFilePath, options);
    }

    //imageUpload Handler
    exports.imageUpload = async (req, res) => {
        try{
            //data fetch
            const { name, tags, email } = req.body;
            console.log(name,tags,email);

            const file = req.files.imageFile;
            console.log(file);

            //validation
            const supportedTypes = ["jpg", "jpeg", "png"];
            const fileType = file.name.split('.')[1].toLowerCase();
            console.log("File Type:", fileType);
            


            if(!isFileTypeSupported(fileType, supportedTypes)) {
                return res.status(400).json({
                    success:false,
                    message:'File format not supported',
                })
            }
            //File Supported hai
            console.log("Uploading to Rai");
            const response = await uploadFileToCloudinary(file, "RAI");
            console.log(response);

            //create entry in DB
            const fileData = await File.create({
                name,
                tags,
                email,
                imageUrl:response.secure_url,
            })

            res.json({
                success:true,
                imageUrl:response.secure_url,
                message:'Image Successfully Uploaded',
            })

        }catch(error){
            console.error(error);
            res.status(400).json({
                success:false,
                message:'Kuch Fata',
            })

        }
    }

//Video Upload ka handler
    exports.videoUpload = async (req, res) => {
        try{
             //data fetch
             const { name, tags, email } = req.body;
             console.log(name,tags,email);

             const file = req.files.videoFile;
 
             //validation
            const supportedTypes = ["mp4", "mov"];
            const fileType = file.name.split('.')[1].toLowerCase();
            console.log("File Type:", fileType);
            

            if(!isFileTypeSupported(fileType, supportedTypes)) {
                return res.status(400).json({
                    success:false,
                    message:'File format not supported',
                })
            }
            //video should be only under 5mb 
            if (file.size > 5 * 1024 * 1024) {
                return res.status(400).send('File size exceeds the 5MB limit');
              }

            //File Supported hai
            console.log("Uploading to Rai");
            const response = await uploadFileToCloudinary(file, "RAI");
            console.log(response);

            //create entry in DB
            const fileData = await File.create({
                name,
                tags,
                email,
                imageUrl:response.secure_url,
            })

            res.json({
                success:true,
                imageUrl:response.secure_url,
                message:'Image Successfully Uploaded',
            })

        }catch(error) {
            console.error(error);
            res.status(400).json({
                success:false,
                message:'kuch fataa',
            });
        }
    }

    //imageSizeReducer ka handler
    exports.imageSizeReducer = async (req, res) => {
        try{
            //data fetch
            const { name, tags, email } = req.body;
            console.log(name,tags,email);

            const file = req.files.imageFile;
            console.log(file);

            //validation
            const supportedTypes = ["jpg", "jpeg", "png"];
            const fileType = file.name.split('.')[1].toLowerCase();
            console.log("File Type:", fileType);

            if (file.size > 5 * 1024 * 1024) {
                return res.status(400).send('File size exceeds the 5MB limit');
              }
            
            if(!isFileTypeSupported(fileType, supportedTypes)) {
                return res.status(400).json({
                    success:false,
                    message:'File format not supported',
                })
            }
            //File Supported hai
            console.log("Uploading to Rai");
            const response = await uploadFileToCloudinary(file, "RAI", 30);
            console.log(response);

            //create entry in DB
            const fileData = await File.create({
                name,
                tags,
                email,
                imageUrl:response.secure_url,
            })

            res.json({
                success:true,
                imageUrl:response.secure_url,
                message:'Image Successfully Uploaded',
            })

        }catch(error){
            console.error(error);
            res.status(400).json({
                success:false,
                message:'kuch fataa',
            });
        }
    }
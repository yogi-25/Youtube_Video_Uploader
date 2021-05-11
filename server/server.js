const express = require("express");

const youtube = require("youtube-api");
const fs = require("fs")

const uuid = require("uuid-v4");

const cors = require("cors");

const open =  require("open")

const multer = require("multer");
const credentials = require('./credentials.json');

const app = express();

app.use(express.json());

app.use(cors());
const storage = multer.diskStorage({
    destination:'/',
    filename(req,file,cb){
        const newfileName = '${uuid()}-${file.originalname}'
        cb(null.newfileName);
    }

})
const uploadVideoFile = multer(
    {
        storage:storage
    }).single("videoFile");
app.post('/uploads',uploadVideoFile,(req,res) => {
    if(req.file)
    {
        const filename = req.file.filename;
        const { title,description } = req.body;
        open(oAuth.generateAuthUrl({
            accept_type:'offline',
            scope: 'https://www.googleapis.com/auth/youtube.upload',
            state:JSON.stringify({
                filename,title,description
            })

        })) 
    }
})
app.get('/oauth2callback',(req,res) => {
    res.redirect("http://localhost:7000/success");
    const { filename,title,description } = JSON.parse(req.query.state);
    oAuth.getToken(req.query.code,(err,tokens) => {
        if(err)
        {
            console.log(err);
            return;
        }
        oAuth.setCredentials(tokens);
        youtube.video.insert({
            resource:{
            snippet:{title,description},
            status:{privacyStatus:'private'}
        },
        part : 'snippet,status',
        media: {
            body:fs.createReadStream(filename)
        } },(err,data) =>{
            console.log("Done");
            process.exit();
        })
    })

})


const oAuth = youtube.authenticate(
    {
        type: 'oauth',
        client_id: credentials.web.client_id,
        client_secret: credentials.web.client_secret,
        redirect_url:credentials.web.redirect_uris[0]
    }
)

const PORT=3000;
app.listen(PORT, () => 
{
    console.log("App is listening on port 3000");
});

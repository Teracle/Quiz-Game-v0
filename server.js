const express=require("express");
const { Http2ServerRequest } = require("http2");
const app=express();
const exphbs=require("express-handlebars");
var HTTP_PORT=process.env.HTTP_PORT || 8080;


app.engine('.html',exphbs.engine({
    extname:'.html',
    defaultLayout:''
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("static"));
app.use(express.static("js"));
app.set('view engine','.html')

app.get("/",(req,res)=>{
   res.render("index.html");
});
app.get("/game",(req,res)=>{
    res.render("game",{
        title:"Play"
    });
});
 
app.get("/highscores",(req,res)=>{
    res.render("highscores",{
        title:"Highscores"
    });
});

app.get("/end",(req,res)=>{
    res.render("end",{
        title:"End"
    });
});
 

function onHttpStart(){
    console.log("Web server is running on port: "+HTTP_PORT);
}

app.listen(HTTP_PORT,onHttpStart);
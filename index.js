import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { MongoClient } from "mongodb";
mongoose.connect("mongodb://0.0.0.0:27017/fitness")
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

const weiredSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Monday:{
      type: String,
      required: true
    },
    Tuesday:{
      type: String,
      required: true
    },
    Wednesday:{
      type: String,
      required: true
    },
    Thursday:{
      type: String,
      required: true
    },
    Friday:{
      type: String,
      required: true
    },
    Saturday:{
      type: String,
      required: true
    },
    Sunday:{
      type: String,
      required: true
    }
});

const collection = mongoose.model('verification1', weiredSchema);
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static("public"));
app.get("/", (req, res) => {
    res.sendFile(  __dirname+"/index.html");
  });
app.get("/sign-in", (req, res) => {
    res.sendFile(  __dirname+"/sign-in.html");
  });
app.get("/login", (req, res) => {
    res.sendFile(  __dirname+"/login.html");
  });
app.get("/pricing", (req, res) => {
    res.sendFile(  __dirname+"/pricing.html");
  });
app.get("/index", (req, res) => {
    res.sendFile(  __dirname+"/");
  });
app.get("/routine", (req, res) => {
    res.sendFile(  __dirname+"/routine.html");
  });
app.get("/about", (req, res) => {
    res.sendFile(  __dirname+"/about.html");
  });
app.get("/why", (req, res) => {
    res.sendFile(  __dirname+"/why.html");
  });

app.get("/beginner", (req, res) => {
    res.sendFile(  __dirname+"/beginner.html");
  });
app.get("/intermediate", (req, res) => {
    res.sendFile(  __dirname+"/intermediate.html");
  });
app.get("/advanced", (req, res) => {
    res.sendFile(  __dirname+"/advanced.html");
  });
app.get("/emh", (req, res) => {
    res.sendFile(  __dirname+"/emh.html");
  });
  let Email = "";
  let Name = "";
  let Password = "";
  let day1="";
  
let Mon="";
let Tue="";
let Wed="";
let Tur="";
let Fri="";
let Sat="";
let Sun="";
const d=new Date();
    let day=d.getDay();
    
    if(day === 0){
      day1="Sunday";
      
    }
    if(day === 1){
      day1="Monday";
    }
    if(day === 2){
      day1="Tuesday";
    }
    if(day === 3){
      day1="Wednesday";
    }
    if(day === 4){
      day1="Thursday";
    }
    if(day === 5){
      day1="Friday";
    }
    if(day === 6){
      day1="Saturday";
    }
app.post("/check", (req, res) => {
    const email = req.body["email"];
    const name = req.body["name"];
    const password = req.body["password"];
    Email = email;
    Name = name;
    Password = password;
    
    
    res.sendFile(__dirname + "/routine.html");
    //collection.insertMany({Email,Name,Password})
});
app.post("/check100", (req, res) => {
    res.sendFile(__dirname + "/emh.html");
    
});
console.log(Email)
const uri = "mongodb://localhost:27017"; 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = client.db("fitness");
const collection1 = db.collection("verification1");
let Name1 = "";
  let Password1 = "";
  let m="";
app.post("/check1",(req,res) => {
    const name=req.body["name"];
    const password=req.body["password"];
    Name1 = name;
    Password1 = password;
    
    var url = "mongodb://0.0.0.0:27017/";
    const databasename = "fitness";  // Database name
    MongoClient.connect(url).then((client) => {
    
        const connect = client.db(databasename);
    
        // Connect to collection
        const collection = connect.collection("verification1");
    
        collection.find({}).toArray().then((ans) => {
            let len = ans.length;
            for(let i=0;i<len;i++){
              if(Name1 === ans[i].Name && Password1 === ans[i].Password){
                  console.log("commited");
                  if(day1 == "Sunday"){
                    m=ans[i].Sunday;
                  }
                  if(day1 == "Monday"){
                    m=ans[i].Monday;
                  }
                  if(day1 =="Tuesday"){
                    m=ans[i].Tuesday;
                  }
                  if(day =="Wednesday"){
                    m=ans[i].Wednesday;
                    document.write(m)
                  }
                  if(day1 == "Thursday"){
                   m=ans[i].Thursday;
                  }
                  if(day1 =="Friday"){
                    m=ans[i].Friday;
                  }
                  if(day1 =="Saturday"){
                    m=ans[i].Saturday;
                  }
                  res.sendFile(  __dirname+"/why.html");
                  break;
              }
            }
            
              res.sendFile(  __dirname+"/login.html");
            
            });
          }).catch((err) => {
    
            // Printing the error message
            console.log(err.Message);
            
        });
    
    });
    
       
        
     
      
    
    

let Monday1="";
let Monday="";
let Tuesday="";
let Wednesday="";
let Thursday="";
let Friday="";
let Saturday="";
let Sunday="";
app.post("/check2",(req,res) => {
    const monday=req.body["Degre"];
    
    Monday1=monday;
    Monday = Monday1[0];
    Tuesday = Monday1[1];
    Wednesday = Monday1[2];
    Thursday = Monday1[3];
    Friday = Monday1[4];
    Saturday = Monday1[5];
    Sunday = Monday1[6];
    collection.insertMany({Email,Name,Password,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday})
    
    res.sendFile(  __dirname+"/index.html");
});

app.post("/check3",(req,res) => {
    const monday=req.body["Degre"];
    
    
    const data={
      day2:day1,
      plan:m,
    }
       res.render("index.ejs",data);
});
app.post("/check5",(req,res) => {
    const monday=req.body["Degre"];
    console.log(monday);
    const data={
      day2:day1,
      plan:m,
    }
       res.render("index1.ejs",data);
   
});
app.post("/check6",(req,res) => {
    const monday=req.body["Degre"];
    console.log(monday);
    const data={
      day2:day1,
      plan:m,
    }
       res.render("index2.ejs",data);
    
});
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});


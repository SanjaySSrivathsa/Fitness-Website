import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import md5 from "md5";
import pg from "pg";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

//global variable
var NAME ;
var AREA;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/real.html");
 
});
app.get("/aboutr", (req, res) => {
    res.sendFile(__dirname + "/aboutr.html");
 
});
app.get("/Anlytical", (req, res) => {
    res.sendFile(__dirname + "/Anlytical.html");
 
});
app.get("/pricing", (req, res) => {
    res.sendFile(__dirname + "/pricing.html");
 
});
app.get("/loginr", (req, res) => {
    res.sendFile(__dirname + "/loginr.html");
 
});
app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
 
});

//This is the login final
app.post("/submitlogin",(req,res) => {
    var login_name=req.body["cname1"];
    var login_Password=req.body["Password1"];
    console.log(login_name)
    console.log(login_Password)
    const db = new pg.Client({
        user: "postgres",
        host: "localhost",
        database: "RealEstate",
        password: "Kabilesh",
        port: 5432,
      });
      db.connect();
      const query='SELECT Name,Password from site_Name';
      const Array=[]
      db.query(query, (err, res) => {
        if (err) {
            console.error(err);
        } else {
            Array.push(...res.rows)
            //console.table(res.rows);
            for(var i=0;i<Array.length;i++){
                if(Array[i].name==login_name && Array[i].password==md5(login_Password)){
                    console.log("s")
                }
            }
            
        }

    
      

    })
})

//register page
app.post("/",(req,res)=>{
    var 
})


app.post("/submit",(req,res) => {
    var customer_name=req.body["cname"];
    var customer_address=req.body["address"];
    var customer_phone=req.body["phone"];
    var customer_email=req.body["email"];
    var customer_password=md5(req.body["Password"]);
    console.log(customer_name)
    console.log(customer_address)
    console.log(customer_phone)
    const db = new pg.Client({
        user: "postgres",
        host: "localhost",
        database: "RealEstate",
        password: "Kabilesh",
        port: 5432,
      });
      db.connect();
    // Insert data into the site_Name table
    const query = 'INSERT INTO site_Name(Name, Adress, Phone, Email, Password) VALUES($1, $2, $3, $4, $5)';
    const values = [customer_name,customer_address,customer_phone,customer_email,customer_password];

    db.query(query, values, (err, res) => {
    if (err) {
        console.error(err);
    } else {
        NAME = customer_name;
        console.log('Data inserted successfully');
    }

    // Disconnect from the database
    db.end();
    });  
    res.sendFile(__dirname + "/pricing.html");
    })
app.listen(port, () => {
    console.log(Listening on port ${port});
  });
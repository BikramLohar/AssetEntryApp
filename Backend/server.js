const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
// const multer=require('multer');
// const path =require('path');
const fs= require('fs');




const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up the directory for file uploads
// const uploadDir=path.join(__dirname, 'uploads');
// if(!fs.existsSync(uploadDir)){
//     fs.mkdirSync(uploadDir);
// }

// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,uploadDir);
//     },
//     filename:(req,file,cb)=>{
//         cb(null,Date.now()+''+file.originalname);
//     }
// });

// const upload=multer({storage});

//database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Bikr@m',
    database: 'asset_details',
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed', err.stack)
    } else {
        console.error('Connected to the Mysql database');
    }
});

const formatDate = (value) => value === "" ? null : value;

//sending file and data from frontend to backend 
app.post('/submit', (req, res) => {
    

    const fromdata = req.body;
   // const fileName=req.file?req.file.filename:null;

    const sql = `INSERT INTO assest (
  \`slNo\`, \`employee_id\`, \`current_user_name\`, site, \`previous_user\`,
  \`employee_status\`, department, system_name, \`os_name\`, make,
  \`system_model\`, \`system_manufacturer\`, \`serial_no\`, \`processor_config\`,
  \`monitor_model_no\`, \`monitor_serial_number\`,upgradation_items, \`upgradation_date\`,
  \`upgradation_price\`, \`purchase_date\`,\`warrenty_date\`,\`vendor_name\`, \`big_mind_install\`, remarks,
   \`asset_code\`, \`windows_activation\`,
  \`o_install\`, \`host_rename\`,\`uploaded_file\`
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;


    const values = [
        fromdata.slno, fromdata.employee_id, fromdata.current_user_name, fromdata.site, fromdata.previous_user,
        fromdata.employee_status, fromdata.department, fromdata.system_name, fromdata.os_name, fromdata.make,
        fromdata.system_model, fromdata.system_manufacturer, fromdata.serial_no, fromdata.processor_config,
        fromdata.monitor_model_no, fromdata.monitor_serial_number, fromdata.upgradation_items, formatDate(fromdata.upgradation_date),
        fromdata.upgradation_price, formatDate(fromdata.purchase_date), formatDate(fromdata.warrenty_date), fromdata.vendor_name,
        fromdata.big_mind_install, fromdata.remarks, fromdata.asset_code, fromdata.windows_activation,
        fromdata.O_install, fromdata.host_rename,null
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Insert Failed', err);
            res.status(500).json({ message: "Error inserting data", error: err });
        } else {
            res.status(200).json({ message: "Data Inserted Successfully" });
        }
    });

});

app.post('/search',(req,res)=>{
    const {assetCode} =req.body;
    const sql = 'SELECT * FROM assest WHERE asset_code = ?';
    db.query(sql,[assetCode],(err,result)=>{
        if(err){
            console.error('Search Failed',err);
            res.status(500).json({message:"Error searching asset",error:err});     
        }else{
            if(result.length===0){
                return res.status(404).json({message:"Asset not Found"});
            }

        }
        res.status(200).json(result[0]);
    });
});

app.listen(port, () => {
    console.log('server is running at  http://localhost:3000 ')
})





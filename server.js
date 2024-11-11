const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db =mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database: "stokes",
});

db.connect((err) =>{
    if(err){
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySql Database");
});

// Create Area
app.post("/areas", (req, res) =>{
    const {areaname, areacode} = req.body;
    const query = "Insert into sodm_areas(`ars_id`, `ars_name`, `ars_shortcode`, `is_default`, `created_at`, `updated_at`, `is_deleted`) values(?,?,?,?,?,?,?)";
    db.query(query, [areaname, areacode], (err, result)=>{
        if(err){
            console.error("Error inserting area:", err);
            res.status(500).send("Error creating area.");
            return;
        }
        res.status(201).json({id:result.insertId, areaname, areacode});
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
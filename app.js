// import express from "express";
// import mysql from 'mysql2/promise';
// import mysql from 'dotenv';

// dotenv.config();
// // import {fileURLToPath} from "url";
// // import {dirname} from "path";


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const app = express();
// const hostname = "127.0.0.1";
// const port = 3000;

// app.use(express.static("public"));

// app.get("/", (req, res) => {
//      res.sendFile(__dirname + "/public/about.html");
// })

// app.listen(port, hostname, () => {
//      console.log(`Server running at ${hostname}:${port}`);
// })
// //Asumsikan ini list user dari database
// const list_user = ["gaspar", "andre", "alwin", "vicky"];

// // Function to log username and time
// const addLog = (req, res, next) => {
//   console.log("Username: ", req.params.username, new Date().toLocaleString());
//   next(); // Proceed to the next middleware or route handler
// };

// // Route to handle user pages
// app.get("/:username", addLog, (req, res, next) => {
//   const username = req.params.username; 
  
//   // Check if the username exists in the list
//   if (!list_user.includes(username.toLowerCase())) {
//     next("route"); // Redirect to the 'route' error handler
//   } else {
//     next(); // Proceed to the next middleware
//   }
// }, (req, res, next) => {
//   res.sendFile(__dirname + "/public/user.html"); // Send the user page
// });

// // Route for invalid usernames
// app.get("/:username", (req, res, next) => {
//   res.sendFile(__dirname + "/public/sorry.html"); // Send the error page
// });

// // Start the server
// app.listen(port, hostname, () => {
//   console.log(`Server running at ${hostname}:${port}`);
// });

import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Configure MySQL connection
const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Log successful connection
console.log('Connected to MySQL database');

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Routes
app.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM students');
        res.render('index', { students: rows });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
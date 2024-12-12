import express from "express";
import {fileURLToPath} from "url";
import {dirname} from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const hostname = "127.0.0.1";
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
     res.sendFile(__dirname + "/public/about.html");
})

app.listen(port, hostname, () => {
     console.log(`Server running at ${hostname}:${port}`);
})
//Asumsikan ini list user dari database
const list_user = ["gaspar", "andre", "alwin", "vicky"];

// Function to log username and time
const addLog = (req, res, next) => {
  console.log("Username: ", req.params.username, new Date().toLocaleString());
  next(); // Proceed to the next middleware or route handler
};

// Route to handle user pages
app.get("/:username", addLog, (req, res, next) => {
  const username = req.params.username; 
  
  // Check if the username exists in the list
  if (!list_user.includes(username.toLowerCase())) {
    next("route"); // Redirect to the 'route' error handler
  } else {
    next(); // Proceed to the next middleware
  }
}, (req, res, next) => {
  res.sendFile(__dirname + "/public/user.html"); // Send the user page
});

// Route for invalid usernames
app.get("/:username", (req, res, next) => {
  res.sendFile(__dirname + "/public/sorry.html"); // Send the error page
});

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at ${hostname}:${port}`);
});
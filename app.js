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
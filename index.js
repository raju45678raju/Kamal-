const { spawn } = require("child_process");
const axios = require("axios");
const logger = require("./utils/log");

///////////////////////////////////////////////////////////
//========= Create website for dashboard/uptime =========//
///////////////////////////////////////////////////////////

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// Serve the index.html file
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

// Start the server and add error handling
app.listen(port, () => {
    logger(`Server is running on port ${port}...`, "[ SaNaN ]");
}).on('error', (err) => {
    if (err.code === 'EACCES') {
        logger(`Permission denied. Cannot bind to port ${port}.`, "[ SaNaN ]");
    } else {
        logger(`Server error: ${err.message}`, "[ Kripya Dhyan de ]");
    }
});

/////////////////////////////////////////////////////////
//========= Start bot with auto-restart on crash =======//
/////////////////////////////////////////////////////////

global.countRestart = global.countRestart || 0;

function startBot(message) {
    if (message) logger(message, "[ SaNaN ]");

    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "sanan.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close", (codeExit) => {
        if (codeExit !== 0 && global.countRestart < 5) {
            global.countRestart++;
            logger(`Bot exited with code ${codeExit}. Restarting... (${global.countRestart}/5)`, "[ Rudra ]");
            startBot();
        } else {
            logger(`Bot stopped after ${global.countRestart} restarts.`, "[ SaNaN ]");
        }
    });

    child.on("error", (error) => {
        logger(`An error occurred: ${JSON.stringify(error)}`, "[ Sanan ]");
    });
}

////////////////////////////////////////////////
//========= Check update from GitHub =========//
////////////////////////////////////////////////

axios.get("https://raw.githubusercontent.com/priyanshu192/bot/main/package.json")
    .then((res) => {
        logger(res.data.name, "[ SaNaN ]");
        logger(`Version: ${res.data.version}`, "[ SaNaN]");
        logger(res.data.description, "[ SaNaN ]");
    })
    .catch((err) => {
        logger(`Failed to fetch update info: ${err.message}`, "[ Sanan ]");
    });

// Start the bot
startBot();

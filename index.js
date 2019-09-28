const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');

let app = express();

app.use(express.static(__dirname + '/public'));


//SSL cert info
const privateKey = fs.readFileSync('/etc/letsencrypt/live/joshuadcox.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/joshuadcox.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/joshuadcox.com/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

//Starting http server
const httpServer = http.createServer(credentials, app);

httpServer.listen(80, () => {
    console.log('HTTP server is running on port 80')


})


//Starting https server
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});
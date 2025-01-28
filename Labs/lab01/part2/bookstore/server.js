import http from 'http';
import fs from 'fs';

const app = http.createServer((req, res) => {
    if (req.url === '/') {
        let webpage = fs.readFileSync("pages/homepage.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(webpage);
    } else if (req.url === '/pages/about.html') {
        let webpage = fs.readFileSync("pages/about.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(webpage);
    } else {
        let webpage = fs.readFileSync("pages/error.html");
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(webpage);
    }
});

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
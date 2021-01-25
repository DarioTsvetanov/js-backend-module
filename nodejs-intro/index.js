const http = require('http');
const fs = require('fs');
const url = require('url');
const queryString = require('querystring');
const events = require('events');

const port = 5000;

let eventEmitter = new events.EventEmitter();

eventEmitter.on('animals', (name) => {
    console.log(`Hello ${name}!`);
});

function requestHandler(req, res) {
    let reqUrl = url.parse(req.url);
    let params = queryString.parse(reqUrl.query);

    if (reqUrl.pathname == '/cats') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });

        fs.readFile('./index.html', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            function updateDynamicData(paramObj) {
                for (let key in paramObj) {
                    let keyWord = `{{${key}}}`;

                    if (!data.includes(keyWord)) continue;

                    let regex = new RegExp(keyWord, "g");

                    data = data.replace(regex, `${paramObj[key]}`);
                }

                return data;
            }

            let view = updateDynamicData({name: 'Timon', age: 10});

            res.write(view);
            res.end();
        });
    }
    else if (reqUrl.pathname == '/animals') {
        res.writeHead(200, {
            'Content-type': 'text/plain'
        });
        
        res.write('Hello Animals!');

        eventEmitter.emit('animals', params.name);

        res.end();
    }
    else {
        res.writeHead(404, {
            'Content-type': 'text/plain',
        });

        res.end();
    }
}

const app = http.createServer(requestHandler);

app.listen(port, () => console.log(`Listening to port ${port}...`));
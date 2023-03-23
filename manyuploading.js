
const http = require("http");
var url = require('url');
const jsdom = require("jsdom");
const { JSDOM } = jsdom; 

const server = http.createServer(async (req, res) => {
    var params = url.parse(req.url, true).query;
    let id = params.id
    if (req.url.includes("/api")) {
        try {
            let resp = await fetchInfo(id)
            res.write(JSON.stringify({ url: resp }));
            res.end();

        } catch (e) {
            console.log(e);
        }
    } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("welcome");
        res.end();
    }
});
let port = process.env.PORT || 8084
server.listen(port, () => {
    console.log(`server started on port: ${port}`);
});

async function fetchInfo(x) {
    console.log(x);
    let html = await fetch(x)
        .then((response) => response.text())
    const dom = new JSDOM(html);

    let gg = dom.window.document.querySelector("source").src

    return gg;
    // .then((data) => console.log(data));

}
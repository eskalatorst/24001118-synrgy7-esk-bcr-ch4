const http = require("http");
const fs = require("fs");
const path = require("path");

const getContentType = (filePath) => {
    const ext = path.extname(filePath);
    switch (ext) {
        case ".html":
            return "text/html";
        case ".css":
            return "text/css";
        case ".js":
            return "text/javascript";
        case ".json":
            return "application/json";
        case ".png":
            return "image/png";
        case ".svg":
            return "image/svg+xml";
        case ".jpg":
        case ".jpeg":
            return "image/jpeg";
        default:
            return "application/octet-stream";
    }
};

const onRequest = (request, response) => {
    if (request.method === "GET" && request.url.startsWith("/public/")) {
        const reqUrl = request.url.split("/").slice(2).join("/");
        console.log(reqUrl);
        const filePath = path.join("./public", reqUrl);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                response.writeHead(404);
                response.end("File not found!");
            } else {
                const contentType = getContentType(filePath);
                response.writeHead(200, { "Content-Type": contentType });
                response.end(data);
            }
        });
        return;
    }
    if (request.url === "/") {
        if (request.method === "GET") {
            // menampilkan file index.html pada folder public
            const filePath = path.join(__dirname, "..", "public", "index.html");
            console.log(filePath);
            try {
                const content = fs.readFileSync(filePath, "utf-8");
                response.writeHead(200, { "Content-Type": "text/html" });
                response.end(content);
            } catch (error) {
                response.writeHead(500, { "Content-Type": "text/plain" });
                console.log(error);
                response.end("Internal Server Error");
            }
            console.log("done");
        } else {
            response.writeHead(405, { "Content-Type": "text/plain" });
            response.end("Method not allowed!");
        }
        return;
    }
    if (request.url === "/cars") {
        if (request.method === "GET") {
            // menampilkan file index.html pada folder public
            const filePath = path.join(__dirname, "..", "public", "cari.html");
            console.log(filePath);
            try {
                const content = fs.readFileSync(filePath, "utf-8");
                response.writeHead(200, { "Content-Type": "text/html" });
                response.end(content);
            } catch (error) {
                response.writeHead(500, { "Content-Type": "text/plain" });
                console.log(error);
                response.end("Internal Server Error");
            }
            console.log("done");
        } else {
            response.writeHead(405, { "Content-Type": "text/plain" });
            response.end("Method not allowed!");
        }
        return;
    }

    const filePath = path.join(__dirname, "..", "public", "404.html");

    const content = fs.readFileSync(filePath, "utf-8");
    response.writeHead(404);
    response.end(content);
    return;
};

const server = http.createServer(onRequest);

server.listen(8000, () => {
    console.log("Server is running on url http://localhost:8000");
});

console.log("Implement servermu disini yak 😝!");
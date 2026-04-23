const http = require("http");

const PORT = 3000;

// Route handlers
const routes = {
  "/": `<html>
    <head><title>Home Page</title></head>
    <body>
      <h1>Home Page</h1>
      <p>Welcome to the Node.js HTTP Server!</p>
      <a href="/about">About</a> | <a href="/contact">Contact</a>
    </body>
  </html>`,

  "/about": `<html>
    <head><title>About Page</title></head>
    <body>
      <h1>About Page</h1>
      <p>This is a basic web server created using Node.js http module.</p>
      <a href="/">Home</a> | <a href="/contact">Contact</a>
    </body>
  </html>`,

  "/contact": `<html>
    <head><title>Contact Page</title></head>
    <body>
      <h1>Contact Page</h1>
      <p>Email: hello@example.com</p>
      <a href="/">Home</a> | <a href="/about">About</a>
    </body>
  </html>`,
};

// Create the server
const server = http.createServer((req, res) => {
  if (routes[req.url]) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(routes[req.url]);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<html><body><h1>404 - Page Not Found</h1><a href='/'>Go Home</a></body></html>");
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

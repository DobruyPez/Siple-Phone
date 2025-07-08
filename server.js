const ip = "0.0.0.0";
const port = 80;

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5501");
  res.end(fs.readFileSync("test.json"));
});

server.listen(port, ip, () => {
 console.log("Server started");
});

// const http = require("http");
// const fs = require("fs");
// const url = require("url");

// const ip = "0.0.0.0";
// const port = 80;

// const server = http.createServer((req, res) => {
//   const { pathname, query } = url.parse(req.url, true);

//   if (pathname === "/getData") {
//     const id = query.id || 0; // Если id не указан, используем значение по умолчанию 0

//     // Читаем файл с данными
//     fs.readFile("test.json", (err, data) => {
//       if (err) {
//         res.statusCode = 500;
//         res.setHeader("Content-Type", "text/plain");
//         res.end("Internal Server Error");
//         return;
//       }

//       try {
//         const jsonData = JSON.parse(data);

//         if (id) {
//           // Если указан параметр id, ищем соответствующий элемент
//           const selectedData = jsonData.find(item => item.id === parseInt(id));

//           if (!selectedData) {
//             res.statusCode = 404;
//             res.setHeader("Content-Type", "text/plain");
//             res.end("Data not found");
//           } else {
//             res.statusCode = 200;
//             res.setHeader("Content-Type", "application/json");
//             res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5501");
//             res.end(JSON.stringify(selectedData));
//           }
//         } else {
//           // Если id не указан, возвращаем все данные из файла
//           res.statusCode = 200;
//           res.setHeader("Content-Type", "application/json");
//           res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5501");
//           res.end(JSON.stringify(jsonData));
//         }
//       } catch (error) {
//         res.statusCode = 500;
//         res.setHeader("Content-Type", "text/plain");
//         res.end("Internal Server Error");
//       }
//     });
//   } else {
//     // Если запрос не на /getData, возвращаем все данные из файла
//     fs.readFile("test.json", (err, data) => {
//       if (err) {
//         res.statusCode = 500;
//         res.setHeader("Content-Type", "text/plain");
//         res.end("Internal Server Error");
//         return;
//       }

//       res.statusCode = 200;
//       res.setHeader("Content-Type", "application/json");
//       res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5501");
//       res.end(data);
//     });
//   }
// });

// server.listen(port, ip, () => {
//   console.log(`Server started at http://${ip}:${port}`);
// });
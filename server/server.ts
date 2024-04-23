import express, { Express, Request, Response, NextFunction } from "express";
// import metrixesRoute from "./routes/metrixesRoutes";

// Definition
const PORT = 8080;
const app: Express = express();

// Routes handler
// app.use("/api/metrixesdashboard", metrixesRoute);

// Default route handler
app.use("/api", (req: Request, res: Response) => {
  res.send("8080 is working and ready to goooooooo!");
});

// 404 Not Found handler
app.use("*", (req: Request, res: Response) => {
  res.status(404).send("Page not found");
});

// Error handler middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Port listening
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

// second approach
// import express, { Request, Response } from "express";
// import next from "next";

// const dev = process.env.NODE_ENV !== "production";
// const app = next({ dev });
// const handle = app.getRequestHandler();
// const port = process.env.PORT || 8080;

// (async () => {
//   try {
//     await app.prepare();
//     const server = express();
//     server.all("*", (req: Request, res: Response) => {
//       return handle(req, res);
//     });
//     server.listen(port, (err?: any) => {
//       if (err) throw err;
//       console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
//     });
//   } catch (e) {
//     console.error(e);
//     process.exit(1);
//   }
// })();

// const { createServer } = require("http");
// const { parse } = require("url");
// const next = require("next");

// const dev = process.env.NODE_ENV !== "development";
// const hostname = "localhost";
// const PORT = 3000;
// // when using middleware `hostname` and `PORT` must be provided below
// const app = next({ dev, hostname, PORT });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   createServer(async (req, res) => {
//     try {
//       // Be sure to pass `true` as the second argument to `url.parse`.
//       // This tells it to parse the query portion of the URL.
//       const parsedUrl = parse(req.url, true);
//       const { pathname, query } = parsedUrl;

//       if (pathname === "/api") {
//         await app.render(req, res, "/", query);
//       } else if (pathname === "/api/testPage") {
//         await app.render(req, res, "/testPage", query);
//       } else if (pathname === "/api/MetrixesDashboard") {
//         await app.render(req, res, "/MetrixesDashboard", query);
//       } else {
//         await handle(req, res, parsedUrl);
//       }
//     } catch (err) {
//       console.error("Error occurred handling", req.url, err);
//       res.statusCode = 500;
//       res.end("internal server error");
//     }
//   })
//     .once("error", (err) => {
//       console.error(err);
//       process.exit(1);
//     })
//     .listen(PORT, () => {
//       console.log(`> Ready on http://${hostname}:${PORT}`);
//     });
// });

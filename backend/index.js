import express from 'express';
import 'dotenv/config';
import getCloset from './api/getCloset.js';
import getUsername from './api/getUsername.js';
import getBrands from './api/getBrands.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));

app.get("/get-closet", (req, res) => {
  let userId = req.query.userId;
  getCloset(userId)
    .then(data => {
      res.setHeader("Content-Type", "application/json")
      res.send(JSON.stringify(data, null, 2));
    })
    .catch((e) => {
      console.log("Error in getCloset: " + e);
    });
});

app.get("/get-username", (req, res) => {
  let userId = req.query.userId;
  getUsername(userId)
    .then((username) => {
      const data = { "username": username };
      res.setHeader("Content-Type", "application/json")
      res.send(JSON.stringify(data, null, 2));
    })
    .catch((e) => {
      console.log("Error in getUsername: " + e);
      res.json({ "username": "" });
    });
});

app.get("/get-brands", (req, res) => {
  getBrands()
    .then(data => {
      res.setHeader("Content-Type", "application/json")
      res.send(JSON.stringify(data, null, 2));
    })
    .catch((e) => {
      console.log("Error: " + e);
    });
});

app.get("/", async (req, res) => {
  res.send(JSON.stringify({ "message": "hello closet genie api" }, null, 2));
});

app.listen(PORT, (error) => {
  if (!error)
    console.log("Server is Successfully Running, and App is listening on port " + PORT)
  else
    console.log("Error occurred, server can't start", error);
}
);

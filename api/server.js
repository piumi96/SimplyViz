const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3080;
const codeRoute = require('./router');

app.use(bodyParser.json());

app.use('/api/', codeRoute);

app.listen(port, () => {
  console.log("listenning to port "+ port);
});

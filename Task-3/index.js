const app = require("./app/src");
require("dotenv").config();

app.listen(process.env.PORT, (req, res) => {
  console.log(`http://localhost:${process.env.PORT}`);
});

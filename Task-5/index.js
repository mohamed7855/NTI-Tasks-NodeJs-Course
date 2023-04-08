require("dotenv").config();
const app = require("./app/src");

app.listen(process.env.PORT, (req, res) => {
  console.log(`http://localhost:${process.env.PORT}`);
});

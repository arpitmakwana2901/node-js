let http = require("http");
const { sum, sub, dayName } = require("./sum");
const { error } = require("console");

http
  .createServer((req, res) => {
    res.write("Good Afternoon");
    res.end();
  })
  .listen(8080, (error) => {
    if (error) {
      console.log("Server is not connected");
      return;
    }
    console.log("Server is connected");
    console.log(sum(10, 10));
    console.log(sub(10, 10));
  });

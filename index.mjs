import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  rl.question("What is your age? ", (age) => {
    console.log("Your age is: " + age);
  });
  console.log("Example app listening to port 3000");
});

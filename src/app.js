const express = require("express");

const app = express();

// ? --> Ex: b? — b with ? quantifier: b is optional (0 or 1 occurrences).
app.get(/ab?c/, (req, res) => {
  res.send("? Optional chaining Ex: /ab?c/");
});

// . --> Ex: . — any single character except newline Example: /a.c/ matches "abc", "a-c"
app.get(/ab.c/, (req, res) => {
  res.send(". (dot) matches any character Ex: /ab.c/");
});

// ^ --> Ex: ^ - indicates start of the string Ex: ^a mathces: "abc","asd"
app.get(/^express$/, (req, res) => {
  res.send("^ start of the string matches a");
});

// + --> — 1 or more of previous token (greedy) Example: /ab+c/ matches "abc", "abbbc" but not "ac"
app.get(/ab+c/, (req, res) => {
  res.send("+ (plus) 1 or more previous tokens Ex: /ab+c/");
});

// * --> — 0 or more of previous token (greedy) Example: /ab*c/ matches "ac", "abc", "abbbc"
app.get(/goo*gle/, (req, res) => {
  res.send("* (star) 0 or more previous tokens Ex:/goo*gle/");
});

app.get("/", (req, res) => {
  res.send("Home page");
});

app.listen(3000, () => {
  console.log("Server is listening at port 3000....");
});

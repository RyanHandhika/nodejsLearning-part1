const express = require("express");
var expressLayouts = require("express-ejs-layouts");
const app = express();
const port = 3000;
const { loadContact, findContact } = require("./utils/contacts.js");
const { name } = require("ejs");

app.set("view engine", "ejs");

// Third-party middleware
app.use(expressLayouts);

// Built-in middleware
app.use(express.static("public"));

app.get("/", (req, res) => {
  const mhs = [
    { name: "Ryan", email: "ryan@gmail.com" },
    { name: "Ikhsan", email: "ikhsan@gmail.com" },
    { name: "Dzaky", email: "jaja@gmail.com" },
  ];
  res.render("index", {
    name: "Ryan Handhika",
    title: "Template Engine Learning",
    layout: "layouts/main-layout",
    mahasiswa: mhs,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Halaman About",
    layout: "layouts/main-layout",
  });
});

app.get("/contact", (req, res) => {
  const contacts = loadContact();
  res.render("contact", {
    title: "Halaman Contact",
    layout: "layouts/main-layout",
    contacts,
  });
});

app.get("/contact/:name", (req, res) => {
  const contact = findContact(req.params.name);
  res.render("detail", {
    title: "Halaman Detail Contact",
    layout: "layouts/main-layout",
    contact,
  });
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("404");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

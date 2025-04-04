const express = require("express");
var expressLayouts = require("express-ejs-layouts");
const app = express();
const port = 3000;
const {
  loadContact,
  findContact,
  addContact,
  cekDuplikat,
  deleteContact,
  updateContacts,
} = require("./utils/contacts.js");
const { validationResult, body } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

app.set("view engine", "ejs");

// konfigurasi flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// Third-party middleware
app.use(expressLayouts);

// Built-in middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

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
    msg: req.flash("msg"),
  });
});

// tambah contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Halaman Tambah",
    layout: "layouts/main-layout",
  });
});

// proses tambah data contact
app.post(
  "/contact",
  [
    body("name").custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error("Name is already exist!");
      }
      return true;
    }),
    body("email", "Email invalid!").isEmail(),
    body("noHP", "Phone number invalid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      addContact(req.body);
      // kirimkan flash message
      req.flash("msg", "Contact is successfuly in added!");
      res.redirect("/contact");
    } else {
      res.render("add-contact", {
        title: "Halaman Tambah",
        layout: "layouts/main-layout",
        errors: result.array(),
      });
    }
  }
);

app.get("/contact/delete/:name", (req, res) => {
  const contact = findContact(req.params.name);
  if (!contact) {
    res.status(404);
    res.send("404");
  } else {
    deleteContact(contact.name);
    req.flash("msg", "Contact is successfuly in deleted!");
    res.redirect("/contact");
  }
});

app.get("/contact/edit/:name", (req, res) => {
  const contact = findContact(req.params.name);
  res.render("edit-contact", {
    title: "Halaman Ubah Contact",
    layout: "layouts/main-layout",
    contact,
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

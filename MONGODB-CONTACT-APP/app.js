const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const { body, validationResult } = require("express-validator");

const methodOverride = require("method-override");

require("./utils/db");
const Contact = require("./model/contact");

const app = express();
const port = 3000;

// Setup method override
app.use(methodOverride("_method"));

// Setup EJS
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Setup Flash
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

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

// Halaman Home
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

// Halaman About
app.get("/about", (req, res) => {
  res.render("about", {
    title: "Halaman About",
    layout: "layouts/main-layout",
  });
});

// Halaman Contact
app.get("/contact", async (req, res) => {
  const contacts = await Contact.find();
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
    body("name").custom(async (value) => {
      const duplikat = await Contact.findOne({ name: value });
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
      Contact.insertMany(req.body);
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

// proses hapus data contact
// app.get("/contact/delete/:name", async (req, res) => {
//   const contact = await Contact.findOne({ name: req.params.name });
//   if (!contact) {
//     res.status(404);
//     res.send("404");
//   } else {
//     await Contact.deleteOne({ _id: contact._id });
//     req.flash("msg", "Contact is successfuly in deleted!");
//     res.redirect("/contact");
//   }
// });
app.delete("/contact", async (req, res) => {
  await Contact.deleteOne({ name: req.body.name });
  req.flash("msg", "Contact is successfuly in deleted!");
  res.redirect("/contact");
});

// proses ubah data contact
app.get("/contact/edit/:name", async (req, res) => {
  const contact = await Contact.findOne({ name: req.params.name });
  res.render("edit-contact", {
    title: "Halaman Ubah Contact",
    layout: "layouts/main-layout",
    contact,
  });
});

app.put(
  "/contact",
  [
    body("name").custom(async (value, { req }) => {
      const duplikat = await Contact.findOne({ name: value });
      if (value !== req.body.oldName && duplikat) {
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
      Contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            name: req.body.name,
            noHP: req.body.noHP,
            email: req.body.email,
          },
        }
      ).then((result) => {
        // kirimkan flash message
        req.flash("msg", "Contact is successfuly in updated!");
        res.redirect("/contact");
      });
    } else {
      res.render("edit-contact", {
        title: "Halaman ubah",
        layout: "layouts/main-layout",
        errors: result.array(),
        contact: req.body,
      });
    }
  }
);

// proses detail data contact
app.get("/contact/:name", async (req, res) => {
  const contact = await Contact.findOne({ name: req.params.name });
  res.render("detail", {
    title: "Halaman Detail Contact",
    layout: "layouts/main-layout",
    contact,
  });
});

app.listen(port, () => {
  console.log(`Mongo Contact App | listening at http://localhost:${port}`);
});

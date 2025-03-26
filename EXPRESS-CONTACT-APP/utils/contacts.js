import fs from "fs";

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

// ambil semua data di contacts.json
const loadContact = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

// cari contact berdasarkan nama
const findContact = (name) => {
  const contacts = loadContact();
  const contact = contacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );
  return contact;
};

// menyimpan data kedalam file contacts.json
const saveContacts = (contacts) => {
  // JSON.stringify() = merubah objek menjadi json
  // JSON.parse() = merubah json menjadi objek
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
};

// menambahkan data baru & menimpa data di file contacts.json
const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContacts(contacts);
};

// cek nama yang duplikat
const cekDuplikat = (name) => {
  const contacts = loadContact();
  return contacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );
};

export { loadContact, findContact, addContact, cekDuplikat };

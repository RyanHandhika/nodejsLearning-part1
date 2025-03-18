import fs from "fs";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const tulisPertanyaan = (pertanyaan) => {
  return new Promise((resolve, reject) => {
    rl.question(pertanyaan, (data) => {
      resolve(data);
    });
  });
};

const simpanContact = (name, email, noHP) => {
  const contact = { name, email, noHP };
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  contacts.push(contact);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
  console.info("Terimakasih sudah menginputkan data!");
  rl.close();
};

// export default { tulisPertanyaan, simpanContact };
export { tulisPertanyaan, simpanContact };

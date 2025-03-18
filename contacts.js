import fs from "fs";
import chalk from "chalk";
import validator from "validator";

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const simpanContact = (name, email, noHP) => {
  const contact = { name, email, noHP };
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);

  // duplicate name check
  const duplicate = contacts.find((contact) => contact.name === name);
  if (duplicate) {
    console.info(chalk.bold.bgRed.black("Contact already exist!"));
    return false;
  }

  // email check
  if (email) {
    if (!validator.isEmail(email)) {
      console.info(chalk.bold.bgRed.black("Email Invalid!"));
      return false;
    }
  }

  // phone number check
  if (!validator.isMobilePhone(noHP, "id-ID")) {
    console.info(chalk.bold.bgRed.black("Phone Number Invalid!"));
    return false;
  }

  contacts.push(contact);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
  console.info(
    chalk.bgGreen.bold.black("Terimakasih sudah menginputkan data!")
  );
};

// export default { tulisPertanyaan, simpanContact };
export { simpanContact };

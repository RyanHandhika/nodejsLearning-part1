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

const loadContact = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

const simpanContact = (name, email, noHP) => {
  const contact = { name, email, noHP };
  const contacts = loadContact();

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

const listContact = () => {
  const contacts = loadContact();
  console.info(chalk.bold.bgGreen.black("Daftar nama & no hp contact : "));
  contacts.forEach((contact, i) => {
    console.info(`${i + 1}. ${contact.name} - ${contact.noHP}.`);
  });
};

const contactDetails = (name) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );

  if (!contact) {
    console.info(chalk.bold.bgRed.black("Name Not Found!"));
    return false;
  }

  console.info(chalk.bold.bgCyan.black("Contact details : "));
  console.info(`Name : ${contact.name}`);
  console.info(`Phone Number : ${contact.noHP}`);
  if (contact.email) {
    console.info(`Email : ${contact.email}`);
  }
};

const contactDelete = (name) => {
  const contacts = loadContact();

  const updatedContacts = contacts.filter(
    (contact) => contact.name.toLowerCase() !== name.toLowerCase()
  );

  if (contacts.length === updatedContacts.length) {
    console.info(chalk.bold.bgRed.black("Name Not Found!"));
    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(updatedContacts));
  console.info(
    chalk.bold.bgBlue.black(`${name} contact deleted successfully!`)
  );
};

// export default { tulisPertanyaan, simpanContact };
export { simpanContact, listContact, contactDetails, contactDelete };

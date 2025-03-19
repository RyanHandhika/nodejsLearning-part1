import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  simpanContact,
  listContact,
  contactDetails,
  contactDelete,
} from "./contacts.js";

yargs(hideBin(process.argv))
  .command({
    command: "add",
    describe: "add a new contact!",
    builder: {
      name: {
        describe: "Full Name",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      noHP: {
        describe: "Phone Number",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      simpanContact(argv.name, argv.email, argv.noHP);
    },
  })
  .command({
    command: "list",
    describe: "see all name & phone number contact!",
    handler() {
      listContact();
    },
  })
  .command({
    command: "detail",
    describe: "contact details by name! ",
    builder: {
      name: {
        describe: "Full Name",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      contactDetails(argv.name);
    },
  })
  .command({
    command: "delete",
    describe: "contact delete by name!",
    builder: {
      name: {
        describe: "Full Name",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      contactDelete(argv.name);
    },
  })
  .demandCommand()
  .parse();

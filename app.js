import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { simpanContact } from "./contacts.js";

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
  .parse();

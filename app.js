// import contacts from "./contacts.js";
import { tulisPertanyaan, simpanContact } from "./contacts.js";

const main = async function () {
  const name = await tulisPertanyaan("Masukkan nama anda : ");
  const email = await tulisPertanyaan("Masukkan email anda : ");
  const noHP = await tulisPertanyaan("Masukkan no HP anda : ");

  simpanContact(name, email, noHP);
};

main();

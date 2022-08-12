import notes from "./notes.js";
import yargs from "yargs";

const y = yargs();
// customize the version
y.version("1.1.0");

// --- ADD COMMAND ----
// invoke command on yargs instance and pass in an object
y.command({
  command: "add",
  describe: "add a new note",
  builder: {
    title: {
      //add configured to take in a title like add --title
      describe: "Note Title",
      demandOption: true, //default = false
      type: "string",
    },
    body: {
      //add configured to take in a body like add --body
      describe: "Note content",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

// --- REMOVE COMMAND ----
y.command({
  command: "remove",
  describe: "remove an existing note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

// --- LIST COMMAND ----
y.command({
  command: "list",
  describe: "list your notes",
  handler() {
    notes.listNotes();
  },
});

// --- READ COMMAND ----
y.command({
  command: "read",
  describe: "read a note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

y.parse(process.argv.slice(2));

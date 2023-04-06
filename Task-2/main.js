const yargs = require("yargs");
const User = require("./modules/users");

yargs.command({
  command: "addUserData",
  builder: {
    name: { demandOption: true },
    email: { demandOption: true },
    age: { demandOption: true },
  },
  handler: (argv) => {
    User.addUserData(argv);
  },
});

yargs.command({
  command: "showAllUsers",
  handler: () => User.showAllUsers(),
});

yargs.command({
  command: "showUserData",
  builder: {
    id: { demandOption: true },
  },
  handler: (argv) => User.showUserData(argv),
});

yargs.command({
  command: "deleteUserData",
  builder: {
    id: { demandOption: true },
  },
  handler: (argv) => User.deleteUserData(argv),
});

yargs.command({
  command: "deleteAllUsers",
  handler: () => User.deleteAllUsers(),
});

yargs.command({
  command: "editUserData",
  builder: {
    id: { demandOption: true },
  },
  handler: (argv) => User.editUserData(argv),
});

yargs.argv;

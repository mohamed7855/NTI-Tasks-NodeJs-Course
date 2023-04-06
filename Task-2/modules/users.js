const userHeads = ["id", "name", "email", "age"];
const dealWithJson = require("./dealWithJson");

const createObject = (data) => {
  const userData = {};
  userHeads.forEach((head) => {
    if (head == "id") userData[head] = Date.now();
    else userData[head] = data[head];
  });
  return userData;
};

/*
{
  argv=
  _: [ 'addUser' ],  name: 'ali',  age: 20,  email: 'm@gmail.com',  '$0': 'main'
}
*/

class User {
  static addUserData = (argv) => {
    const userData = createObject(argv);
    const data = dealWithJson.readJsonData("users.json");
    data.push(userData);
    dealWithJson.writeJsonData("users.json", data);
    console.log("Data added successfully");
  };

  static showAllUsers = () => {
    const allUsers = dealWithJson.readJsonData("users.json");
    if (!allUsers.length) {
      console.log("not users yet");
      return;
    }
    allUsers.forEach((user, i) => {
      console.log(
        `${i + 1} - id: ${user.id} - Name: ${user.name} - Age : ${
          user.age
        } - Email : ${user.email}`
      );
    });
  };

  static showUserData = (argv) => {
    const allUsers = dealWithJson.readJsonData("users.json");
    const singleUser = allUsers.find((element) => element.id == argv.id);
    if (!singleUser) console.log("no user with this id to show");
    else console.log(singleUser);
  };

  static deleteUserData = (argv) => {
    const allUsers = dealWithJson.readJsonData("users.json");
    const singleUser = allUsers.find((element) => element.id == argv.id);
    allUsers.splice(allUsers.indexOf(singleUser), 1);
    if (!singleUser) console.log("no user with this id to delete");
    else dealWithJson.writeJsonData("users.json", allUsers);
  };

  static deleteAllUsers = () => {
    dealWithJson.writeJsonData("users.json", []);
  };
  /*
{
  argv=  _: [ 'addUser' ],  name: 'ali',  age: 20,  email: 'm@gmail.com',  '$0': 'main'
}
{
  elementFound
  id: 1680399427586,
  name: 'mohamed',
  email: 'mohamed@gmail.com',
  age: 20
}
*/
  static editUserData = (argv) => {
    const allUsers = dealWithJson.readJsonData("users.json");

    const indexUser = allUsers.findIndex((element) => element.id == argv.id);
    allUsers[indexUser].name = argv.name || allUsers[indexUser].name;
    allUsers[indexUser].age = argv.age || allUsers[indexUser].age;
    allUsers[indexUser].email = argv.email || allUsers[indexUser].email;
    dealWithJson.writeJsonData("users.json", allUsers);
    // allUsers.forEach((element, index) => {
    //   if (element.id == argv.id) {
    //     allUsers[index].name = argv.name || element.name;
    //     allUsers[index].age = argv.age || element.age;
    //     allUsers[index].email = argv.email || element.email;

    //     dealWithJson.writeJsonData("users.json", allUsers);
    //   }
    // });
  };
}

module.exports = User;

require("../src/db/mongoose");
const Task = require("../src/models/task");

Task.findByIdAndDelete("5d0aaac4ad4ec139164c453b")
  .then(task => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then(result => {
    console.log(result);
  })
  .catch(e => {
    console.log(e);
  });

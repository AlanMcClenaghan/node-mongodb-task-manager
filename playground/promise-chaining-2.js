require("../src/db/mongoose");
const Task = require("../src/models/task");

// Task.findByIdAndDelete("5d0aaac4ad4ec139164c453b")
//   .then(task => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then(result => {
//     console.log(result);
//   })
//   .catch(e => {
//     console.log(e);
//   });

const deleteTaskAndCount = async id => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  console.log(task);
  return count;
};

deleteTaskAndCount("5d06aa23c2563d27ba9f9077")
  .then(count => {
    console.log(count);
  })
  .catch(e => {
    console.log(e);
  });

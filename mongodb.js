// CRUD: Create Read Update Delete

// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// Gernerate your own id
// const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());
// console.log(id.id);
// console.log(id.toHexString().length);
// console.log(id.id.length);

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }

    const db = client.db(databaseName);

    // Reading documents
    // db.collection("users").findOne(
    //   { _id: new ObjectID("5d03b63669a5551c80a2604a") },
    //   (error, user) => {
    //     if (error) {
    //       return console.log("Unable find document");
    //     }
    //     console.log(user);
    //   }
    // );

    db.collection("tasks").findOne(
      { _id: new ObjectID("5d03ba3a0bb6251cd944606a") },
      (error, task) => {
        if (error) {
          return console.log("Unable find document");
        }
        console.log(task);
      }
    );

    // db.collection("users")
    //   .find({ age: 47 })
    //   .toArray((error, users) => {
    //     console.log(users);
    //   });

    // db.collection("users")
    //   .find({ age: 47 })
    //   .count((error, count) => {
    //     console.log(count);
    //   });

    db.collection("tasks")
      .find({ completed: false })
      .toArray((error, tasks) => {
        console.log(tasks);
      });

    db.collection("tasks")
      .find({ completed: false })
      .count((error, tasks) => {
        console.log(tasks);
      });

    // Creating documents
    // db.collection("users").insertOne(
    //   {
    //     _id: id,
    //     name: "Ruth",
    //     age: 47
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert user");
    //     }

    //     console.log(result.ops);
    //   }
    // );

    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "Matthew",
    //       age: 9
    //     },
    //     {
    //       name: "Lucy",
    //       age: 7
    //     }
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert documents");
    //     }

    //     console.log(result.ops);
    //   }
    // );

    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "Walk the dog",
    //       completed: true
    //     },
    //     {
    //       description: "Feed the cat",
    //       completed: false
    //     },
    //     {
    //       description: "Wash the dishes",
    //       completed: false
    //     }
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert tasks");
    //     }

    //     console.log(result.ops);
    //   }
    // );
  }
);

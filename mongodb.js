// CRUD: Create Read Update Delete

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }

    console.log("Connected correctly!");

    const db = client.db(databaseName);

    // db.collection("users").insertOne(
    //   {
    //     name: "Alan",
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

    db.collection("tasks").insertMany(
      [
        {
          description: "Walk the dog",
          completed: true
        },
        {
          description: "Feed the cat",
          completed: false
        },
        {
          description: "Wash the dishes",
          completed: false
        }
      ],
      (error, result) => {
        if (error) {
          return console.log("Unable to insert tasks");
        }

        console.log(result.ops);
      }
    );
  }
);

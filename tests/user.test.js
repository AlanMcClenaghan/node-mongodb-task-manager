const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { userOneId, userOne, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should signup a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Andrew",
      email: "andrew@example.com",
      password: "MyPass777!"
    })
    .expect(201);

  // Assert that database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: "Andrew",
      email: "andrew@example.com"
    },
    token: user.tokens[0].token
  });

  // Assert that password is not returned in plain text
  expect(user.password).not.toBe("MyPass777!");
});

test("Should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200);

  // Assert that database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertions about the response
  expect(response.body).toMatchObject({
    token: user.tokens[1].token
  });
});

test("Should not login nonexistent user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: "thisisnotmypass"
    })
    .expect(400);
});

test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get profile for unauthenticated user", async () => {
  await request(app)
    .get("/users/me")
    .send()
    .expect(401);
});

test("Should delete account for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  // Assert that database was changed correctly
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("Should not delete account for unauthenticated user", async () => {
  await request(app)
    .delete("/users/me")
    .send()
    .expect(401);
});

test("Should upload avatar", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200);

  // Assert that avatar has been uploaded correctly
  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update valid user fields", async () => {
  await request(app)
    .patch("/users/me/")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Jess"
    })
    .expect(200);

  // Assert that name has been updated correctly
  const user = await User.findById(userOneId);
  expect(user.name).toEqual("Jess");
});

test("Should NOT update invalid user fields", async () => {
  await request(app)
    .patch("/users/me/")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: "London"
    })
    .expect(400);
});

//
// User Test Ideas
//
// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated

test("Should NOT signup user with invalid name", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "",
      email: "andrew@example.com",
      password: "MyPass777!"
    })
    .expect(400);
  // console.log(response.body.user);
});

test("Should NOT signup user with invalid email", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Andrew",
      email: "aaa",
      password: "MyPass777!"
    })
    .expect(400);
  // console.log(response.body.user);
});

test("Should NOT signup user with invalid password", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Andrew",
      email: "andrew@example.com",
      password: ""
    })
    .expect(400);
  // console.log(response.body.user);
});

test("Should NOT update user if unauthenticated", async () => {
  const response = await request(app)
    .patch("/users/me/")
    // .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Jess"
    })
    .expect(401);

  // Assert that user has NOT been updated
  const user = await User.findById(userOneId);
  expect(user.name).not.toEqual("Jess");
});

test("Should NOT update user with invalid name", async () => {
  const response = await request(app)
    .patch("/users/me/")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: ""
    })
    .expect(400);

  // Assert that user has NOT been updated
  const user = await User.findById(userOneId);
  expect(user.name).not.toEqual("");
});

test("Should NOT update user with invalid email", async () => {
  const response = await request(app)
    .patch("/users/me/")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      email: ""
    })
    .expect(400);

  // Assert that user has NOT been updated
  const user = await User.findById(userOneId);
  expect(user.email).not.toEqual("");
});

test("Should NOT update user with invalid password", async () => {
  const response = await request(app)
    .patch("/users/me/")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      password: ""
    })
    .expect(400);
});

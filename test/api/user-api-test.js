import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { gymmarkService } from "./gymmark-service.js";
import { maggie, testUsers } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    gymmarkService.clearAuth();
    gymmarkService.createUser(maggie);
    await gymmarkService.authenticate(maggie);
    await gymmarkService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await gymmarkService.createUser(testUsers[i]);
    }
    await gymmarkService.createUser(maggie);
    await gymmarkService.authenticate(maggie);
  });
  teardown(async () => {});

  test("create a user", async () => {
    await gymmarkService.deleteAllUsers();
    const newUser = await gymmarkService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all user", async () => {
    let returnedUsers = await gymmarkService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await gymmarkService.deleteAllUsers();
    await gymmarkService.createUser(maggie);
    await gymmarkService.authenticate(maggie);
    returnedUsers = await gymmarkService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user", async () => {
    const returnedUser = await gymmarkService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await gymmarkService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("get a user - deleted user", async () => {
    await gymmarkService.deleteAllUsers();
    await gymmarkService.createUser(maggie);
    await gymmarkService.authenticate(maggie);
    try {
      const returnedUser = await gymmarkService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});


import { EventEmitter } from "events";
import { assert } from "chai";
import { gymmarkService } from "./gymmark-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, maggieCredentials, goldsGym, testGyms } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Gym API tests", () => {
  let user = null;

  setup(async () => {
    gymmarkService.clearAuth();
    user = gymmarkService.createUser(maggie);
    await gymmarkService.authenticate(maggieCredentials);
    await gymmarkService.deleteAllGyms();
    await gymmarkService.deleteAllUsers();
    user = await gymmarkService.createUser(maggie);
    await gymmarkService.authenticate(maggieCredentials);
    goldsGym.userid = user._id;
  });

  teardown(async () => {});

  test("create gym", async () => {
    const returnedGym = await gymmarkService.createGym(goldsGym);
    assert.isNotNull(returnedGym);
    assertSubset(goldsGym, returnedGym);
  });

  test("delete a gym", async () => {
    const gym = await gymmarkService.createGym(goldsGym);
    const response = await gymmarkService.deleteGym(gym._id);
    assert.equal(response.status, 204);
    try {
      const returnedGym = await gymmarkService.getGym(gym.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Gym with this id", "Incorrect Response Message");
    }
  });

  test("create multiple gyms", async () => {
    for (let i = 0; i < testGyms.length; i += 1) {
      testGyms[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await gymmarkService.createGym(testGyms[i]);
    }
    let returnedLists = await gymmarkService.getAllGyms();
    assert.equal(returnedLists.length, testGyms.length);
    await gymmarkService.deleteAllGyms();
    returnedLists = await gymmarkService.getAllGyms();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant gym", async () => {
    try {
      const response = await gymmarkService.deleteGym("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Gym with this id", "Incorrect Response Message");
    }
  });
});

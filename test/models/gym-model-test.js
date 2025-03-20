import { EventEmitter } from "events";
import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testGyms, goldsGym } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

EventEmitter.setMaxListeners(25);

suite("Gym Model tests", () => {
  setup(async () => {
    db.init("json");
    await db.gymStore.deleteAllGyms();
    for (let i = 0; i < testGyms.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testGyms[i] = await db.gymStore.addGym(testGyms[i]);
    }
  });

  test("create a gym", async () => {
    const gym = await db.gymStore.addGym(goldsGym);
    assertSubset(goldsGym, gym);
    assert.isDefined(gym._id);
  });

  test("delete all gyms", async () => {
    let returnedGyms = await db.gymStore.getAllGyms();
    assert.equal(returnedGyms.length, 3);
    await db.gymStore.deleteAllGyms();
    returnedGyms = await db.gymStore.getAllGyms();
    assert.equal(returnedGyms.length, 0);
  });

  test("get a gym - success", async () => {
    const gym = await db.gymStore.addGym(goldsGym);
    const returnedGym = await db.gymStore.getGymById(gym._id);
    assertSubset(goldsGym, returnedGym);
  });

  test("delete One Gym - success", async () => {
    const id = testGyms[0]._id;
    await db.gymStore.deleteGymById(id);
    const returnedGyms = await db.gymStore.getAllGyms();
    assert.equal(returnedGyms.length, testGyms.length - 1);
    const deletedGym = await db.gymStore.getGymById(id);
    assert.isNull(deletedGym);
  });

  test("get a gym - bad params", async () => {
    assert.isNull(await db.gymStore.getGymById(""));
    assert.isNull(await db.gymStore.getGymById());
  });

  test("delete One Gym - fail", async () => {
    await db.gymStore.deleteGymById("bad-id");
    const allGyms = await db.gymStore.getAllGyms();
    assert.equal(testGyms.length, allGyms.length);
  });
});

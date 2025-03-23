/* eslint-disable import/no-duplicates */
import { assert } from "chai";
import { gymmarkService } from "./gymmark-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie } from "../fixtures.js";
import { maggieCredentials } from "../fixtures.js";


suite("Authentication API tests", async () => {
  setup(async () => {
    gymmarkService.clearAuth();
    await gymmarkService.createUser(maggie);
    await gymmarkService.authenticate(maggieCredentials);
    await gymmarkService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await gymmarkService.createUser(maggie);
    const response = await gymmarkService.authenticate(maggieCredentials);
    assert(response.success);
    assert.isDefined(response.token);
    await gymmarkService.deleteAllUsers();
  });

  test("verify Token", async () => {
    const returnedUser = await gymmarkService.createUser(maggie);
    const response = await gymmarkService.authenticate(maggieCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
    await gymmarkService.deleteAllUsers();
  });

  test("check Unauthorized", async () => {
    gymmarkService.clearAuth();
    try {
      await gymmarkService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});

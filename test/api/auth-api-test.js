import { assert } from "chai";
import { gymmarkService } from "./gymmark-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    gymmarkService.clearAuth();
    gymmarkService.createUser(maggie);
    await gymmarkService.authenticate(maggie);
    await gymmarkService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await gymmarkService.createUser(maggie);
    const response = await gymmarkService.authenticate(maggie);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await gymmarkService.createUser(maggie);
    const response = await gymmarkService.authenticate(maggie);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
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

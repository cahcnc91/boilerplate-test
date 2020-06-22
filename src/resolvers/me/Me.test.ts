import { Connection } from "typeorm";
import { testConn } from "../../test-utils/TestConn";
import { gCall } from "../../test-utils/gcall";
import faker from "faker";
import { User } from "../../entity/User";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

const registerMutation = `
{
  me {
    id
    firstName
    lastName
    email
    name
  }
}
`;

describe("Me", () => {
  it("get user", async () => {
    const user = await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }).save();

    const response = await gCall({
      source: registerMutation,
      userId: user.id,
    });

    expect(response).toMatchObject({
      data: {
        me: {
          id: `${user.id}`,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
    });
  });

  it("return null", async () => {
    const response = await gCall({
      source: registerMutation,
    });

    expect(response).toMatchObject({
      data: {
        me: null,
      },
    });
  });
});

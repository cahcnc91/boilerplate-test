import { Connection } from "typeorm";
import { testConn } from "../../test-utils/TestConn";
import { gCall } from "../../test-utils/gcall";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

const registerMutation = `
mutation Register($data: RegisterInput!) {
  register(
    data: $data
  ) {
    id
    firstName
    lastName
    email
    name
  }
}
`;

describe("Register", () => {
  it("creates a user", async () => {
    const user = {
      firstName: "camila",
      lastName: "coder",
      email: "camila.coder12@gmail.com",
      password: "1234",
    };
    const response = await gCall({
      source: registerMutation,
      variableValues: {
        data: user,
      },
    });

    console.log(response);

    if (response.errors) {
      console.log(response.errors[0].originalError);
    }
  });
});

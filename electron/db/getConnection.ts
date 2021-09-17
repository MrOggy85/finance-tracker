import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import Account from "./account/Account";
import Balance from "./balance/Balance";

let connection: Connection;

async function getConnection() {
  if (connection) {
    return connection;
  }
  connection = await createConnection({
    type: "sqlite",
    database: "test",
    synchronize: true,
    entities: [Account, Balance],
  });

  return connection;
}

export default getConnection;

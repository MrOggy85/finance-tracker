import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import Account from "./account/Account";
import Balance from "./balance/Balance";
import Entry from "./entry/Entry";

let connection: Connection;

async function getConnection() {
  if (connection) {
    return connection;
  }
  connection = await createConnection({
    type: "sqlite",
    database: "test",
    synchronize: true,
    entities: [Account, Balance, Entry],
  });

  return connection;
}

export default getConnection;

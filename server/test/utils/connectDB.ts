import { MongoMemoryServer } from "mongodb-memory-server";

import mongoose from "mongoose";

const connectDB = () => {
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongod.stop();
    await mongoose.disconnect();
  });
};

export default connectDB;

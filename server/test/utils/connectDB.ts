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

  beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for(const collection of collections) {
      await collection.deleteMany({});
    }
  });
};

export default connectDB;

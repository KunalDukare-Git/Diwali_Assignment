import mongoose from "mongoose";

const db = require("./config").get(process.env.ENVIRONMENT).Database;

const MONGOURL = `mongodb://${db.host}:${db.port}/${db.dbName}`;

const userCredential = {
  user: db.userName,
  pass: db.password,
};

export const mongoConnection = async () => {
  try {
    await mongoose.connect(MONGOURL, userCredential);
    console.log("Connected to Database",db.dbName);
  } catch (e) {
    console.log(e);
  }
};

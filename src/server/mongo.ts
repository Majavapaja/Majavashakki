import mongoose from "mongoose";
import { SchemaOptions } from "mongoose";
import {isProd} from "./util"
import { User } from "./models/User"
import bcrypt from "bcryptjs"

export async function clearDatabase() {
  if (isProd()) {
    throw new Error("How about you stop calling clearDatabase in production!")
  }

  console.log("Clearing database")
  await mongoose.connection.dropDatabase()
  for (const modelName of mongoose.modelNames()) {
    const model = mongoose.model(modelName)
    await model.init()
  }
}

export async function initTestData() {
  if (isProd()) {
    throw new Error("How about you stop calling initTestData in production!")
  }

  await User.insertMany([
    {
      name: "John Smith",
      email: "john.smith@example.com",
      logins: [{
        _id: "john.smith@example.com",
        type: "Local",
        primary: true,
        password: await bcrypt.hash("johnsmith123", 10),
      }],
    },
    {
      name: "John Doe",
      email: "john.doe@example.com",
      logins: [{
        _id: "john.doe@example.com",
        type: "Local",
        primary: true,
        password: await bcrypt.hash("johndoe123", 10),
      }],
    },
  ])
}

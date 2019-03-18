import mongoose from "mongoose";
import { SchemaOptions } from "mongoose";
import {isProd} from "./util"

export const schemaOptions = (overrides = {}): SchemaOptions => {
  return {
    timestamps: true,
    ...overrides,
  }
}

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

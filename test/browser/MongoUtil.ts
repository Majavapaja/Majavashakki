import mongoose from "mongoose"
import { isProd } from "../../src/server/util"
import { IUser, User, LoginType } from "../../src/server/models/User"
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

  const users: IUser[] = [
    {
      name: "John Smith",
      email: "john.smith@example.com",
      logins: [
        {
          loginId: "john.smith@example.com",
          type: LoginType.Local,
          password: await bcrypt.hash("johnsmith123", 10),
        },
      ],
    },
    {
      name: "John Doe",
      email: "john.doe@example.com",
      logins: [
        {
          loginId: "john.doe@example.com",
          type: LoginType.Local,
          password: await bcrypt.hash("johndoe123", 10),
        },
      ],
    },
  ]
  await User.insertMany(users)
}

import mongoose from "mongoose"

let connectionString = "mongodb://localhost:27017"
if (process.env.MajavashakkiMongoConnectionString) {
  connectionString = process.env.MajavashakkiMongoConnectionString.replace(
    process.env.MajavaMongoPassword,
    encodeURIComponent(process.env.MajavaMongoPassword)
  )
}

export class MongooseClient {
  private static hooksInitialized: boolean = false

  public static async InitMongoConnection() {
    const DATABASE_NAME = process.env.DATABASE_NAME || "Majavashakki"
    await mongoose.connect(connectionString, { dbName: DATABASE_NAME })
    mongoose.set("debug", false)

    if (!this.hooksInitialized) {
      this.initDefaultHooks()
      this.hooksInitialized = true
    }
  }

  public static getConnection(): mongoose.Connection {
    return mongoose.connection
  }

  public static async disconnect(): Promise<void> {
    await mongoose.disconnect()
  }

  private static initDefaultHooks() {
    // https://medium.com/@vsvaibhav2016/best-practice-of-mongoose-connection-with-mongodb-c470608483f0
    mongoose.connection.on("connected", () => {
      console.log("MongooseClient connected")
    })

    mongoose.connection.on("error", err => {
      console.log(`Mongoose default connection has occured ${err} error`)
    })

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose default connection is disconnected")
    })

    process.on("SIGINT", () => {
      mongoose.connection.close(() => {
        console.log("Mongoose default connection is disconnected due to application termination")
        process.exit(0)
      })
    })
  }
}


// import {using} from "../components/disposable";

// export class UserRepository {
//   public static doMagic() {
//     using(mongoose.createConnection("mongodb://localhost:27017"), () => {
//       // do shit
//     });
//   }
// }

// // import {MajavaDbClient} from "./MajavaDbClient";
// // import {usingAsync} from "../components/disposable";
// // import {Game} from "../entities/GameRoom";
// // import {UserState} from "../entities/UserState";
// // import * as _ from "lodash";
// // import * as util from "util";

// // export class ApplicationUserRepository {

// //   public static async getUser(id: string): Promise<ApplicationUser> {
// //     console.log("Get user");
// //     let user: ApplicationUser = null;
// //     await usingAsync(new MajavaDbClient(), async (mongo) => {
// //       const collection = mongo.getCollection<ApplicationUser>(MajavaDbClient.UserCollection);
// //       user = await collection.findOne({id});
// //     });
// //     return user;
// //   }

// //   public static async create(user: ApplicationUser) {
// //     console.log(`Creating user ${user.id} ${user.name}`);
// //     await usingAsync(new MajavaDbClient(), async (mongo) => {
// //       const collection = mongo.getCollection<ApplicationUser>(MajavaDbClient.UserCollection);
// //       const result = await collection.insertOne(user);
// //     });
// //   }

// //   public static async update(user: ApplicationUser) {
// //     console.log(`Updating user ${user.id} ${user.name}`);
// //     await usingAsync(new MajavaDbClient(), async (mongo) => {
// //       const collection = mongo.getCollection<ApplicationUser>(MajavaDbClient.UserCollection);
// //       const existing = await collection.findOne({id: user.id});
// //       if (!existing) {
// //         throw new Error("Trying to update user data that does not exist!");
// //       }
// //       const result = await collection.replaceOne({ id: user.id }, user);
// //       console.log("User updated successfully.");
// //     });
// //   }
// // }

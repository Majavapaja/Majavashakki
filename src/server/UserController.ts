import { User, IUserDocument } from "./data/User";

export default {
  getUser: async (req, res) => {
    const user = req.user;
    res.set("Cache-Control", "no-cache");
    res.send(!user ? null : {id: user._id, name: user.name, email: user.email} as global.IUserContract)
  },

  postUser: async (req, res) => {
    const user = req.body as global.IUserContract;
    const loggedUser: IUserDocument = req.user
    if (String(loggedUser._id) !== user.id) {
      throw new Error("Identity theft error!")
    }
    console.log(`Updating user : ${loggedUser._id} - ${loggedUser.name} `);
    await User.save(user);
    req.user = user; // TODO get rid of this or maybe don't fetch user to passport state in every request...
    res.send("OK")
  },

  registerUser: async (req, res) => {
    const user = req.body as global.IUserContract;
    console.log("New user received :" + JSON.stringify(user));

    const result = await User.registerUser(user);

    if (result) res.send("OK")
    else res.status(500).send({ error: "Couldn't create user" })
  },
}
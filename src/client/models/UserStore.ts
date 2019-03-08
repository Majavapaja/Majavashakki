import { observable, action } from "mobx";
import ApiService from "../common/ApiService";
import { UserUpdateRequest } from "common/types";

export default class UserStore {

  @observable
  name: string;

  @observable
  email: string;

  private _api: ApiService

  constructor(api: ApiService){
    this._api = api;
  }

  @action
  public async login(email: string, password: string) {
    await this._api.write.login({email, password} as global.IUserContract);
    const user = await this._api.read.user();
    console.log(user)

    this.name = user.name
    this.email = user.email
  }

  @action
  public async update(email: string, name: string) {
    const payload: UserUpdateRequest = { name, email }

    await this._api.write.user(payload);

    this.name = name
    this.email = email
  }
}
import { observable, action } from "mobx";
import ApiService from "../common/ApiService";
import { UserUpdateRequest } from "common/types";

export default class UserStore {
  @observable public id: string
  @observable public name: string;
  @observable public email: string;

  private _api: ApiService

  constructor(api: ApiService) {
    this._api = api;
    this.refreshFromServer()
  }

  @action
  public async login(email: string, password: string) {
    await this._api.write.login({email, password} as global.IUserContract);
    await this.refreshFromServer()
  }

  @action
  public async refreshFromServer() {
    const user = await this._api.read.user();
    if (!user) return

    this.id = user.id
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
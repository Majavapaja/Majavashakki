import { observable, action } from "mobx";
import ApiService from "../common/ApiService";

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
    var user = await this._api.read.user();
    this.name = user.name
    this.email = user.email
  }
}
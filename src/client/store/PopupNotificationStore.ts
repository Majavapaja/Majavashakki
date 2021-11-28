import { makeObservable, observable } from "mobx"

/** Shows popup notifications using Snackbar */
export default class PopupNotificationStore {
  @observable
  public show: boolean = false
  public message?: string
  public close = () => (this.show = false)

  constructor() {
    makeObservable(this)
  }

  public notify = (message: string): void => {
    this.message = message
    this.show = true
  }
}

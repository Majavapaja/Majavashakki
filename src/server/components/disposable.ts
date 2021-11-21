export interface IDisposable {
  dispose()
}

export function using<T extends IDisposable>(resource: T, func: (resource: T) => void) {
  try {
    func(resource)
  } finally {
    resource.dispose()
  }
}

export interface IDisposableAsync {
  init(): Promise<any>
  dispose()
}

export async function usingAsync<T extends IDisposableAsync>(resource: T, func: (resource: T) => Promise<any>) {
  try {
    await resource.init()
    await func(resource)
  } finally {
    resource.dispose()
  }
}

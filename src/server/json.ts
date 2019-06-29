import * as t from "io-ts"
import { PathReporter } from "io-ts/lib/PathReporter"
import { RequestHandler, Request, Response } from "express"
import {isProd} from "./util"

export class NotFoundError {
  constructor(readonly message: string) {}
}

export class ValidationError {
  constructor(readonly errors: string[]) {}
}

export function validate<RequestT, TypeT extends t.Type<RequestT> = t.Type<RequestT>>(iotsType: TypeT, body: any): RequestT {
  const result = iotsType.decode(body)
  if (result.isLeft()) {
    throw new ValidationError(PathReporter.report(result))
  } else if (result.isRight()) {
    return result.value
  }
}

export function jsonAPI<ResponseT>(handler: (req: Request) => Promise<ResponseT>): RequestHandler {
  return async (req: Request, res: Response) => {
    try {
      const json: ResponseT = await handler(req)
      writeJSON(res, 200, json)
    } catch (e) {
      if (e instanceof ValidationError) {
        const errors = e.errors
        console.log("Validation errors:", errors)
        writeJSON(res, 400, {error: "Bad Request", errors},
        )
      } else if (e instanceof NotFoundError) {
        writeJSON(res, 404, {error: "Not Found", message: e.message})
      } else {
        console.log(`Error handling request: ${req.path}`)
        console.log(e)
        writeJSON(res, 500, isProd()
          ? {error: "Internal Server Error"}
          : {error: "Internal Server Error", message: e.message},
        )
      }
    }
  }
}

const writeJSON = (res, statusCode, json) => {
  res.set("Cache-Control", "no-cache");
  res.set("content-type", "application/json")
  res.status(statusCode).send(JSON.stringify(json, null, 2))
}

import { SchemaOptions } from "mongoose";

export const schemaOptions = (overrides = {}): SchemaOptions => {
  return {
    timestamps: true,
    ...overrides,
  }
}

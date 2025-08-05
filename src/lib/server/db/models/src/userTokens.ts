import { model, Schema } from "mongoose";
import pkg from "mongoose";
const { models } = pkg;
import type { IUserToken } from "supportmail-types";

const userTokenSchema = new Schema<IUserToken>(
  {
    userId: { type: String, required: true, unique: true },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    expiresAt: { type: Date, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      flattenMaps: true,
      flattenObjectIds: true,
    },
    toObject: {
      flattenMaps: true,
      flattenObjectIds: true,
    },
  },
);

export const UserToken = models.UserToken
  ? model<IUserToken>("UserToken")
  : model<IUserToken>("UserToken", userTokenSchema, "userTokens");

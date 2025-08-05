import { Document, Types } from "mongoose";
import type { UserRole } from "supportmail-types";

export type FlattenDocResult<T, IncludeId extends boolean> = IncludeId extends true
  ? DocumentWithId<Omit<T, "__v" | "_id">>
  : Omit<T, "__v" | "_id">;

export function FlattenDocToJSON<T>(
  val: Document<unknown, {}, T, {}> &
    T & {
      _id: Types.ObjectId;
    } & {
      __v?: number;
    },
  with_Id?: false,
): FlattenDocResult<T, false>;
export function FlattenDocToJSON<T>(
  val: Document<unknown, {}, T, {}> &
    T & {
      _id: Types.ObjectId;
    } & {
      __v?: number;
    },
  with_Id: true,
): FlattenDocResult<T, true>;

/**
 * Converts a Mongoose Document or FlattenMaps object to a plain JSON object.
 *
 * @template T - The type of the document/object being converted
 * @param val - The Mongoose Document or FlattenMaps object to convert
 * @param with_Id - Whether to include the MongoDB `_id` field in the result. Defaults to false
 * @returns A plain JSON object of type T with optional `_id` field based on the `with_Id` parameter
 *
 * @example
 * ```typescript
 * const userToken = await UserToken.findById(id);
 * const userJson = DocumentToJSON(userToken); // Without _id
 * const userJsonWithId = DocumentToJSON(userToken, true); // With _id
 * ```
 *
 * @remarks
 * This is an extended implementation of `Document.toJSON()` - one can pass basically anything and
 * option handling is easier.
 */
export function FlattenDocToJSON<T>(
  val: Document<unknown, {}, T, {}> &
    T & {
      _id: Types.ObjectId;
    } & {
      __v?: number;
    },
  with_Id: boolean = false,
): FlattenDocResult<T, typeof with_Id> {
  return val.toJSON({
    flattenMaps: true,
    flattenObjectIds: true,
    versionKey: false,
    transform: (_, ret) => {
      const { _id, __v, ...rest } = ret;
      if (!with_Id) {
        return rest;
      } else {
        return { _id, ...rest };
      }
    },
  }) as FlattenDocResult<T, typeof with_Id>;
}

export function hasUserRoles(userRoles: number[], ...roles: UserRole[]) {
  return roles.some((role) => userRoles.includes(role));
}

export function hasUserRole(userRoles: number[], role: UserRole) {
  return userRoles.includes(role);
}

import type { DiscordBotAPI, DiscordUserAPI } from "$lib/server/discord";
import type { APIUser } from "discord-api-types/v10";
import type { FlattenMaps } from "mongoose";
import type { IUserToken, UserRole } from "supportmail-types";

declare global {
  namespace App {
    interface Platform {
      env: Env;
      cf: CfProperties;
      ctx: ExecutionContext;
    }

    interface Error {
      status: number;
      message: string;
      route: string;
    }

    interface Locals {
      getSafeSession: () => Promise<SafeSessionResult>;
      /**
       * @returns Whether the user is authenticated.
       */
      isAuthenticated: () => boolean;
      /**
       * @returns Whether the user is an admin.
       */
      isAdmin?: () => Promise<boolean>;
      user: APIUser | null;
      token: FlatUserToken | null;
      discordRest: DiscordBotAPI;
      /**
       * User API Client. Given always, if `locals.user` and `locals.token` is set.
       */
      discordUserRest: DiscordUserAPI | null;
      userRoles: UserRole[] | null;
    }

    interface PageData {
      stats: StatsResponse;
      meta?: StatsMetadata;
      /**
       * The current user, if authenticated.
       *
       * ! Can only be set for the `/m/` routes.
       */
      user: APIUser | null;
    }
  }

  type FlatUserToken = FlattenMaps<IUserToken>;

  /**
   * Represents the result of a safe session validation operation.
   *
   * This discriminated union type provides three possible outcomes:
   * - Success: Contains both user data and token when session is valid
   * - Expired: Contains token but no user when session has expired
   * - Error: Contains neither user nor token when session is not found or other errors occur
   *
   * @example
   * ```typescript
   * // Successful session
   * const success: SafeSessionResult = { user: apiUser, token: userToken };
   *
   * // Expired session
   * const expired: SafeSessionResult = { user: null, token: userToken, error: "expired" };
   *
   * // Session not found
   * const notFound: SafeSessionResult = { user: null, token: null, error: "notfound" };
   * ```
   */
  type SafeSessionResult =
    | { user: APIUser; token: FlatUserToken; error?: never }
    | { user: null; token: FlatUserToken; error: "expired" }
    | { user: null; token: null; error: "other" | "notfound" | "network" };

  type StatsResponse = { guilds: number; users: number; tickets: number; fallback?: true };

  type StatsMetadata = {
    status: number | "unknown" | "fallback" | "stale";
    message: string;
  };

  /**
   * Returned by the `/stats/history` endpoint
   */
  interface IHistoryStats {
    guilds: number;
    users: number;
    tickets: number;
    /**
     * ISO 8601 date string
     */
    timestamp: string;
  }

  /**
   * Returned by the `/stats/current` endpoint
   */
  interface IBotStats {
    guilds: number;
    users: number;
    tickets: number;
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
  }

  type DocumentWithId<T> = T & {
    _id: string;
  };

  /**
   * Represents a cached result for user roles.
   */
  type CachedUserRolesStringResult = UserRole[];
}

export {};

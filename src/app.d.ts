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

    interface Locals {}

    interface PageData {
      stats: StatsResponse;
      meta?: StatsMetadata;
    }
  }

  type StatsResponse = { guilds: number; users: number; tickets: number; fallback?: true };

  type StatsMetadata = {
    status: number | "unknown" | "fallback" | "stale" | "timeout";
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
}

export {};

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

    // interface Locals {}

    interface PageData {
      stats: StatsResponse;
      meta?: StatsMetadata;
    }

    // interface PageState {}
  }

  type StatsResponse = { guilds: number; users: number; tickets: number; fallback?: true };

  type StatsMetadata = {
    status: number | "unknown" | "fallback" | "stale";
    message: string;
  };

  /**
   * Interface from mongodb
   */
  interface IBotStats {
    guilds: number;
    tickets: number;
    users: number;
    createdAt: Date; // MongoDB will automatically set this
    updatedAt: Date; // MongoDB will automatically set this
  }
}

export {};

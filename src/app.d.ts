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
    status: number | "unknown" | "fallback";
    message: string;
  };
}

export {};
